import React, { useState } from "react";
import style from "./PriceArea.module.css";
import Icon from "@/component/atom/icon/Icon";
import Payment from "@/component/organism/payment/payment";

const PriceArea = () => {
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	

	return (
		<>
			<div className={style.price}>
				<p className={style.priceNum}>
					<span>2,699</span>
					<Icon iconName="purchasePoint" />
				</p>
				<button type="button" className={style.btnPayment} 
				onClick={() => setIsPaymentOpen(true)}
				>
					구매하기
				</button>
			</div>
			<Payment 
				isOpen={isPaymentOpen}
				onClose={() => setIsPaymentOpen(false)}
			/>
		</>
	);
};

export default PriceArea;
