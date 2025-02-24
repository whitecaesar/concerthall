"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./payment.module.css";
import Icon from "@/component/atom/icon/Icon";
import Button from "@/component/atom/button/Button";
import sha1 from 'crypto-js/sha1';
import { getPassCheckAxios, getBalanceCheckAxios, setTrackPurchaseAxios, setPaymentAxios, setAlbumPurchaseAxios } from "@/services/contents/PayAxios";
import { getCookie } from "@/services/common";

interface PaymentProps {
	onClose: () => void;
	isOpen: boolean;
	trackId? : string;
	albumId? : string;
	type? : string;
	price? : number;
	idKey : string;
	onPurchaseComplete: () => void;
	onError?: (message: string) => void; // 새로운 prop 추가
}

export function generateUniqueId() {
  // 현재 시간(ms)
  const currentTime = Date.now();
  // Math.random()을 이용해 8자리 랜덤 문자열 생성
  const randomStr = Math.random().toString(36).substring(2, 10);
  // 두 값을 결합하여 고유 ID 생성 (예: "1644761723456_ab12cd34")
  return `${currentTime}_${randomStr}`;
}

export default function Payment({ onClose, isOpen, trackId, albumId, type, price, onPurchaseComplete, onError, idKey }: PaymentProps) {
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
	};

	const handleSubmit = async () => {
		try {
			if (pin.length === 0) {
				if (onError) {
					onError("Please enter your password."); // 직접 에러 메시지 전달
				}
				return;
			}

			// PIN을 SHA-1으로 암호화

			const hashedPin = sha1(pin).toString();
			// 비밀번호 확인
			const passCheckResponse = await getPassCheckAxios({
				password: hashedPin
			});

			if (passCheckResponse.code === "200") {
				// 잔액 확인
				const balanceResponse = await getBalanceCheckAxios();
				// 입력값 초기화 및 모달 닫기
				const point = balanceResponse.data.rewardPoint + balanceResponse.data.chargePoint;
				if(price && point  > price)
				{
					const IDCUST = getCookie("userid");
					if (!IDCUST || !price) {
						setErrorMessage("Required information is missing.");
						if (onError) {
							onError("Required information is missing."); // 직접 에러 메시지 전달
						}
					}
					
					const paymentId = generateUniqueId();
					const paymentParam = {
						price : price,
						cpCode : "TEST_CP",
						appType : "CONCERTHALL",
						paymentId : paymentId,
					}; 
					const paymentResponse = await setPaymentAxios(paymentParam, idKey);
					if (paymentResponse.code === "200.1" && paymentResponse.message === "ok") {
						const param = {
							ID_CUST: IDCUST?IDCUST:'',
							PRICE: price, // number 타입 유지
							PAYMENT_ID : paymentId,
						};
						
						const purchaseResponse = type ==='track'?
						await setTrackPurchaseAxios(trackId, param):
						await setAlbumPurchaseAxios(albumId, param);

						if (purchaseResponse.RES_CODE === "0000") {
							onPurchaseComplete();
							setPin("");
						} else {
							setErrorMessage(purchaseResponse.RES_MSG);
							if (onError) {
								onError(purchaseResponse.RES_MSG); // 직접 에러 메시지 전달
							}
						}
						onClose();
					} else {
						setErrorMessage(paymentResponse.message);
						if (onError) {
							onError(paymentResponse.message); // 직접 에러 메시지 전달
						}
					}
				}
				else
				{
					setErrorMessage(balanceResponse.message);
					if (onError) {
						onError(balanceResponse.message); // 직접 에러 메시지 전달
					}
				}
			} else {
				if (onError) {
					onError(passCheckResponse.message); // 직접 에러 메시지 전달
				}
			}



		} catch (error) {
			console.error("An error occurred during payment processing:", error);
			setErrorMessage("An error occurred during payment processing.");
			if (onError) {
				onError(error instanceof Error ? error.message : String(error));
			}
			onClose();
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
						PASSWORD
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
								<p className={style.textWhite}>Please re-enter.</p>
								<p className={style.textRed}>{errorMessage}</p>
							</>
						)}
					</div>
					<button 
						className={style.btnOk} 
						onClick={handleSubmit}
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
}
