"use client";
import React, { useState } from "react";

const ThumbupButton = (status? : boolean) => {
	const [isActive, setIsActive] = useState(status);

	const toggleButton = () => {
		setIsActive(!isActive);
		console.log(isActive);
		if(!isActive)
		{
			/* 취소 처리 */
		}
		else
		{
			/* 등록 처리 */
		}
	};

	return (
		<>
			<button
				onClick={toggleButton}
				className={`thumbupBtn ${isActive ? "on" : ""}`}
			></button>
			<style jsx>{`
				.thumbupBtn {
					display: inline-block;
					width: 22px;
					height: 22px;
					background-size: contain;
					background-position: center center;
					background-repeat: no-repeat;
					background-image: url(/images/icon/png/icon_thumbup.png);
					&.on {
						background-image: url(/images/icon/png/icon_thumbup_on.png);
					}
				}
			`}</style>
		</>
	);
};

export default ThumbupButton;
