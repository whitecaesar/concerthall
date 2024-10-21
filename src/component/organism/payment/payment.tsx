"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./payment.module.css";
import Icon from "@/component/atom/icon/Icon";

export default function Payment() {
	const [pin, setPin] = useState(""); // 비밀번호 상태 관리
	const inputRef = useRef<HTMLInputElement>(null); // input 필드를 참조하는 ref

	// 페이지가 로드될 때 input에 자동으로 포커스를 맞춤
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// 최대 6자리까지만 입력 허용
		if (value.length <= 6) {
			setPin(value);
		}
	};

	// 동그라미를 클릭했을 때 input에 포커스
	const handleDotClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	// 동그라미를 채우기 위한 함수
	const renderDots = () => {
		const filledDots = pin.length;
		return Array(6)
			.fill(0)
			.map((_, index) => (
				<span
					key={index}
					className={`${style.dot} ${index < filledDots ? style.filled : ""}`}
					onClick={handleDotClick} // 동그라미를 클릭했을 때 input에 포커스
				></span>
			));
	};

	return (
		<div className={style.paymentArea}>
			<div className={style.paymentAreaInner}>
				<p>
					<Icon iconName="paymentLogo" />
					Point 결제 비밀번호
				</p>
				<div className={style.pinDots}>{renderDots()}</div>
				<input
					type="password"
					id="pin-input"
					maxLength={6}
					inputMode="numeric"
					autoComplete="off"
					value={pin}
					onChange={handleInputChange}
					ref={inputRef}
					className={style.hiddenInput}
				/>
				<div className={style.erroText}>
					<p className={style.textWhite}>다시 입력해 주세요.</p>
					<p className={style.textRed}>비밀번호가 일치하지 않습니다.</p>
				</div>
			</div>
		</div>
	);
}
