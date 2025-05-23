"use client";
import React, { useState } from "react";
import style from "./priceArea.module.css";
import Icon from "@/component/atom/icon/Icon";
import Payment from "@/component/organism/payment/payment";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";
import { funcAlbumPlayClick, funcPreviewClick, generateClientRandomString, getCookie } from "@/services/common";
import Popup from "@/component/atom/popup/Popup";
import { funcGetPreviewAxios } from "@/services/contents/PlayInfoAxios";
import { useRouter } from "next/navigation";
import { purchaseTexts } from "@/component/organism/menuList/MenuList";

interface PriceAreaProps {
	AlbumItem: ALBUM_DETAIL_TYPE;
}

const PriceArea = ({ AlbumItem }: PriceAreaProps) => {
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("No preview tracks available.");
	const id_key = generateClientRandomString();
	const router = useRouter();

	const handlePurchaseComplete = () => {
		const lang = getCookie("lang") || "en";
		const purchaseText = purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase;
		router.push(`/my/purchaseList?title=${purchaseText}`);
	};

	const handleConfirm = () => {
		setIsPopupOpen(false);
	};
	

	const handlePreview = async () => {
		// AlbumItem.ITEM_INFO가 존재하고 배열이 비어있지 않은지 확인
		if (AlbumItem.ITEM_INFO && AlbumItem.ITEM_INFO.length > 0) {
				const track_id = AlbumItem.ITEM_INFO[0].ID;
				const trackPreviewUrl = await funcGetPreviewAxios(track_id);
				if (trackPreviewUrl.RES_CODE !== "0000") {
					setPopupDescription("No preview tracks available.");
					setIsPopupOpen(true);
					return;
				}
				
				const track_info = AlbumItem.ITEM_INFO[0];

				console.log("track_info", track_info);
				if (typeof track_info !== 'object' || track_info === null || Object.keys(track_info).length === 0) {
					setPopupDescription("No preview tracks available.");
					setIsPopupOpen(true);
					return;
				}
				funcPreviewClick(trackPreviewUrl.INFO.URL, "0000", track_info);
			
		} else {
				setPopupDescription("No preview tracks available.");
				setIsPopupOpen(true);
				return;
		}
	}

	return (
		<>
			<div className={style.price}>
				<button type="button" className={style.btnPreview}
					onClick={() => handlePreview()}
				>
					Preview
				</button>
				<button
					type="button"
					className={style.btnPayment}
					onClick={() => setIsPaymentOpen(true)}
				>
					Buy Now&nbsp;&nbsp;
					<p className={style.priceNum}>
						<span>{AlbumItem.ALBUM_PRICE}</span>
						<Icon iconName="purchasePoint" />
					</p>
				</button>
			</div>
			<Payment
				isOpen={isPaymentOpen}
				onClose={() => setIsPaymentOpen(false)}
				albumId={AlbumItem.ID}
				idKey={id_key}
				type="album"
				price={AlbumItem.ALBUM_PRICE}
				description={AlbumItem.TITLE}
				onPurchaseComplete={handlePurchaseComplete}
			/>

			<Popup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="INFORMATION"
				description={popupDescription}
				buttons={[{ text: "OK", className: "ok", onClick: handleConfirm }]}
			/>

		</>
	);
};

export default PriceArea;
