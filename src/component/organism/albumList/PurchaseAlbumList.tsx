"use client";
import {
  ITEM_INFO_TYPE,
} from "@/services/contents/ViewAllAxios";
import { useEffect, useState } from "react";
import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import style from "./albumList.module.css";
import Popup from "@/component/atom/popup/Popup";
import { useRouter } from "next/navigation";
import { purchaseTexts } from "../menuList/MenuList";
import { getCookie } from "@/services/common";
import { setCancelAxios, setCitechCancelAxios } from "@/services/contents/PurchaseCancelAxios";

interface PurcahseAlbumListProps {
	albumList?: ITEM_INFO_TYPE[];
}

export default function PurchaseAlbumList({ albumList }: PurcahseAlbumListProps) {

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPaymentCancelOpen, setIsPaymentCancelOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("구매가 불가한 트랙입니다.");
	const [selectedAlbum, setSelectedAlbum] = useState<ITEM_INFO_TYPE | null>(null);
	const [isPurchaseCancel, setIsPurchaseCancel] = useState(false);
	
	const router = useRouter();
	const lang = getCookie("lang") || "en";
	const purchaseText = purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase;
	
	const handleConfirm = () => {
		setIsPopupOpen(false);
		if(isPurchaseCancel) {
			window.location.reload(); // 페이지 리로드로 대체
		}
	};

	const handleCancel = () => {
		setIsPopupOpen(false);
	};

	const handleCancelOpen = (album : ITEM_INFO_TYPE) => {
		setSelectedAlbum(album);
		setIsPaymentCancelOpen(true);
	};

	const handlePopupOpen = (message: string) => {
		setPopupDescription(message);
		setIsPopupOpen(true);
	};

	const handlePaymentCancel = async () => {
		// 구매 취소 처리
		const id_cust = getCookie('userid') || '';
		const cancelResponse = await setCancelAxios(selectedAlbum?.PAYMENT_ID || '', {
			ID_CUST: id_cust
		});
		console.log("cancelResponse=>", cancelResponse);
		if (cancelResponse.RES_CODE !== "0000") {
			setPopupDescription(`${cancelResponse.RES_MSG}`);
			setIsPopupOpen(true);
		}
		else {
			const roseCancelResponse = await setCitechCancelAxios({
				cpCode: 'test-01',
				appType: 'CONCERTHALL',
				purchaseId: selectedAlbum?.PAYMENT_ID || '',
				reason: 'SIMPLE_CHANGE_OF_MIND'
			});
			console.log("roseCancelResponse=>", roseCancelResponse);
			if (roseCancelResponse.code !== "200.1") {
				setPopupDescription(`${roseCancelResponse.message}`);
				setIsPopupOpen(true);
			}
			else {
				setPopupDescription(`Your purchase has been canceled.`);
				setIsPurchaseCancel(true);
				setIsPopupOpen(true);
				setIsPaymentCancelOpen(false);
			}
		}
	};

	const handleClose = () => {
		setIsPaymentCancelOpen(false);
	};

  return (
		<>
			<div className={style.albumListContainer}>

			<ul className={`${style.albumList} ${style.noScroll}`}>
				{albumList?.map((item: ITEM_INFO_TYPE, index: number) => (
					<li key={index}>
						<AlbumItem
							albumInfo={item}
              type='purchase'
							handlePopupOpen={handlePopupOpen}
							handleCancelOpen={handleCancelOpen}
						/>
					</li>
				))}
			</ul>
      <style jsx>{`
					.trackNum {
						padding: 10px 15px;
						font-size: 13px;
						position: sticky;
						top: 0;
						z-index: 1;
					}
			`}</style>
		</div>
		<Popup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="INFOMATION"
				description={popupDescription}
				buttons={[{ text: "OK", className: "ok", onClick: handleConfirm }]}
			/>
		<Popup
				isOpen={isPaymentCancelOpen}
				onClose={() => setIsPaymentCancelOpen(false)}
				title="CANCEL"
				description="Would you like to cancel your purchase?"
				buttons={[{ text: "OK", className: "ok", onClick: handlePaymentCancel }, { text: "CANCEL", className: "cancel", onClick: handleClose }]}
			/>
		</>
	);
}
