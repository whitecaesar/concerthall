// 앨범 리스트들
"use client";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import style from "./albumList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { useRouter } from "next/navigation";
import { getCookie } from "@/services/common";
import { purchaseTexts } from "../menuList/MenuList";
import { setCancelAxios, setCitechCancelAxios } from "@/services/contents/PurchaseCancelAxios";
import { useState } from "react";
import Popup from "@/component/atom/popup/Popup";


interface AlbumListProps {
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
}

const AlbumList = ({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	showTitle,
	noScroll = false,
}: AlbumListProps) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPaymentCancelOpen, setIsPaymentCancelOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("구매가 불가한 트랙입니다.");
	const [selectedAlbum, setSelectedAlbum] = useState<ITEM_INFO_TYPE | null>(null);
	
	const router = useRouter();
	const lang = getCookie("lang") || "en";
	const purchaseText = purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase;
	
	const handleConfirm = () => {
		setIsPopupOpen(false);
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
		const cancelResponse = await setCancelAxios(selectedAlbum?.PAYMENT_ID || '', {
			ID_CUST: getCookie('id_cust') || ''
		});
		if (cancelResponse.REG_CODE !== "0000") {
			setPopupDescription(`${cancelResponse.REG_MSG}`);
			setIsPopupOpen(true);
		}
		else {
			const roseCancelResponse = await setCitechCancelAxios({
				cpCode: 'test-01',
				appType: 'CONCERTHALL',
				purchaseId: selectedAlbum?.PAYMENT_ID || '',
				reason: 'SIMPLE_CHANGE_OF_MIND'
			});
			if (roseCancelResponse.code !== "200.1") {
				setPopupDescription(`${roseCancelResponse.message}`);
				setIsPopupOpen(true);
			}
			else {
				setPopupDescription(`Your purchase has been canceled.`);
				router.push(`/my/purchaseList?title=${purchaseText}`);
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
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && TITLE && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
					href={`/detail/album/${ID}?title=${encodeURIComponent(TITLE)}`}
				/>
			)}
			<ul className={style.albumList}>
				
				{ ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<AlbumItem
							albumInfo={item}
							handlePopupOpen={handlePopupOpen}
							handleCancelOpen={handleCancelOpen}
						/>
					</li>
				))}
			</ul>
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
};

export default AlbumList;

