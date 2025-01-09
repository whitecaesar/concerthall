"use client";
import React from "react";
import styles from "./Popup.module.css";
import Button from "../button/Button";
import Icon from "../icon/Icon";

type ButtonData = {
	text: string; // 버튼 텍스트
	className?: string; // 버튼 스타일 클래스
	onClick: () => void; // 버튼 클릭 이벤트
};

type Props = {
	title?: string; // 팝업 제목
	description?: string; // 팝업 설명
	children?: React.ReactNode; // 팝업 내부 추가 콘텐츠
	isOpen: boolean; // 팝업 열림 여부
	onClose: () => void; // 팝업 닫기 함수
	buttons?: ButtonData[]; // 버튼 데이터 배열
};

export default function Popup({
	title,
	description,
	children,
	isOpen,
	onClose,
	buttons,
}: Props) {
	if (!isOpen) return null;

	return (
		<div className={styles.popup}>
			<div className={styles.dimmed} onClick={onClose}></div>
			<div className={styles.popupContent}>
				{title && (
					<div className={styles.titleWrap}>
						<Icon iconName={"paymentLogo"} />
						<h3 className={styles.title}>{title}</h3>
					</div>
				)}
				{description && <p className={styles.descriptionText}>{description}</p>}
				{children}
				{buttons && (
					<div className={styles.buttonGroup}>
						{buttons.map((button, index) => (
							<Button
								key={index}
								type="button"
								className={styles[button.className || ""]}
								text={button.text}
								onClick={button.onClick}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
