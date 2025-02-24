import React, { useState } from "react";
import style from "./priceArea.module.css";
import Icon from "@/component/atom/icon/Icon";
import Payment from "@/component/organism/payment/payment";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";
import { generateClientRandomString } from "@/services/common";

interface PriceAreaProps {
	AlbumItem: ALBUM_DETAIL_TYPE;
}

const handlePurchaseComplete = () => {
	//	refetch();
};
const PriceArea = ({ AlbumItem }: PriceAreaProps) => {
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const id_key = generateClientRandomString();

	{
		/*여기에 앨범? id 넘겨야 겠네*/
	}

	return (
		<>
			<div className={style.price}>
				<button type="button" className={style.btnPreview}>
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
				onPurchaseComplete={handlePurchaseComplete}
			/>
		</>
	);
};

export default PriceArea;
