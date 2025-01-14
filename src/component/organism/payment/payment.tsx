"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./payment.module.css";
import Icon from "@/component/atom/icon/Icon";

interface PaymentProps {
	onClose: () => void;
	isOpen: boolean;
}

export default function Payment({ onClose, isOpen }: PaymentProps) {
	const [pin, setPin] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPin(value);
	};

	if (!isOpen) return null;

	return (
		<div className={style.modalOverlay}>
			<div className={style.paymentArea}>
				<button className={style.closeButton} onClick={onClose}>
					<Icon iconName="close" />
				</button>
				<div className={style.paymentAreaInner}>
					<p>
						<Icon iconName="paymentLogo" />
						Point 결제 비밀번호
					</p>
					<input
						type="password"
						id="pin-input"
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
		</div>
	);
}
