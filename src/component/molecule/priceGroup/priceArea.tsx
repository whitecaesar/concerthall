import React, { useState } from "react";
import style from "./priceArea.module.css";
import Icon from "@/component/atom/icon/Icon";
import Payment from "@/component/organism/payment/payment";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";

interface PriceAreaProps {
	AlbumItem: ALBUM_DETAIL_TYPE;
}

const handlePurchaseComplete = () => {
	//	refetch();
};
const PriceArea = ({ AlbumItem }: PriceAreaProps) => {
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	{
		/*여기에 앨범? id 넘겨야 겠네*/
	}

	return (
		<>
			<div className={style.price}>
				<button type="button" className={style.btnPreview}>
					미리보기
				</button>
				<button
					type="button"
					className={style.btnPayment}
					onClick={() => setIsPaymentOpen(true)}
				>
					구매하기&nbsp;&nbsp;
					<p className={style.priceNum}>
						<span>{AlbumItem.ALBUM_PRICE}</span>
						<Icon iconName="purchasePoint" />
					</p>
				</button>
			</div>
			<Payment
				isOpen={isPaymentOpen}
				onClose={() => setIsPaymentOpen(false)}
				trackId="test"
				onPurchaseComplete={handlePurchaseComplete}
			/>
		</>
	);
};

export default PriceArea;
