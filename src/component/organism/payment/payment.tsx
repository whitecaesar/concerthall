"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./payment.module.css";
import Icon from "@/component/atom/icon/Icon";
import Button from "@/component/atom/button/Button";
import sha1 from 'crypto-js/sha1';
import { getPassCheckAxios, getBalanceCheckAxios, setTrackPurchaseAxios } from "@/services/contents/PayAxios";
import { getCookie } from "@/services/common";

interface PaymentProps {
	onClose: () => void;
	isOpen: boolean;
	trackId? : string;
	albumId? : string;
	type? : string;
	price? : number;
}

export default function Payment({ onClose, isOpen, trackId, albumId, type, price }: PaymentProps) {
	const [pin, setPin] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPin(value);
		setErrorMessage("");
	};

	const handleSubmit = async () => {
		try {
			if (pin.length === 0) {
				setErrorMessage("비밀번호를 입력해주세요.");
				return;
			}

			// PIN을 SHA-1으로 암호화
			/*
			const hashedPin = sha1(pin).toString();
			// 비밀번호 확인
			const passCheckResponse = await getPassCheckAxios({
				password: hashedPin
			});
			

			if (passCheckResponse.code === "200") {
				// 잔액 확인
				const balanceResponse = await getBalanceCheckAxios();
				console.log("잔액 정보:", balanceResponse.data);
				
				// 입력값 초기화 및 모달 닫기
				setPin("");
				onClose();
			} else {
				setErrorMessage("비밀번호가 일치하지 않습니다.");
			}
			*/

			const IDCUST = getCookie("userid");
			if (!IDCUST || !price || !trackId) {
				throw new Error("필수 정보가 누락되었습니다.");
			}

			const param = {
				ID_CUST: IDCUST,
				PRICE: price // number 타입 유지
			};

			const purchaseResponse = await setTrackPurchaseAxios(trackId, param);

			if (purchaseResponse.RES_CODE === "0000") {
				// 잔액 확인
				console.log("결제완료");
				// 여기에 플레이 시키는 로직 들어가야함.
			} else {
				setErrorMessage(purchaseResponse.RES_MSG);
			}

		} catch (error) {
			console.error("결제 처리 중 오류 발생:", error);
			setErrorMessage("결제 처리 중 오류가 발생했습니다.");
		}
	};

	if (!isOpen) return null;

	return (
		<div className={style.modalOverlay}>
			<div className={style.paymentArea}>
				<button className={style.closeButton} onClick={onClose}>
					<Icon iconName="popClose" />
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
						{errorMessage && (
							<>
								<p className={style.textWhite}>다시 입력해 주세요.</p>
								<p className={style.textRed}>{errorMessage}</p>
							</>
						)}
					</div>
					<button 
						className={style.btnOk} 
						onClick={handleSubmit}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
}
