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
		setPin(value);
	};

	return (
		<div className={style.paymentArea}>
			<div className={style.paymentAreaInner}>
				<p>
					<Icon iconName="paymentLogo" />
					Point 결제 비밀번호
				</p>
				<input
					type="password"
					id="pin-input"
					//maxLength={6}
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
