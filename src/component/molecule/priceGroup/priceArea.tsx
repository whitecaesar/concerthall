import React from "react";
import style from "./PriceArea.module.css";
import Icon from "@/component/atom/icon/Icon";

const PriceArea = () => {
	return (
		<>
			<div className={style.price}>
				<p>Price</p>
				<p className={style.priceNum}>
					<span>2,699</span>
					<Icon iconName="purchasePoint" />
				</p>
			</div>
			<div className={style.priceButtonGroup}>
				<button type="button" className="">
					미리보기
				</button>
				<button type="button" className={style.btnPayment}>
					구매
				</button>
			</div>
		</>
	);
};

export default PriceArea;
