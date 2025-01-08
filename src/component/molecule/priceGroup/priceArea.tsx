import React from "react";
import style from "./PriceArea.module.css";
import Icon from "@/component/atom/icon/Icon";

const PriceArea = () => {
	return (
		<>
			<div className={style.price}>
				<p className={style.priceNum}>
					<span>2,699</span>
					<Icon iconName="purchasePoint" />
				</p>
				<button type="button" className={style.btnPayment}>
					구매하기
				</button>
			</div>
		</>
	);
};

export default PriceArea;
