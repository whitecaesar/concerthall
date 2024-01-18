"use client";
import React, { useState } from "react";

interface KeywordProps {
	KeywordText: string;
	onClick: () => void;
}

const Keyword = ({ KeywordText, onClick }: KeywordProps) => {
	const [isActive, setIsActive] = useState(false);

	const keywordClick = () => {
		setIsActive(false);
		onClick();
	};

	return (
		<div>
			<button
				className={`keyword ${isActive ? "active" : ""}`}
				onClick={keywordClick}
			>
				{KeywordText}
			</button>
			<style jsx>{`
				.keyword {
					text-align: center;
					background: #000;
					border: 1px solid var(--borderDark);
					border-radius: 30px;
					color: #fff;
					min-width: 50px;
					height: 35px;
					padding: 0 15px;
					white-space: nowrap;
				}
				.keyword.active {
					background: var(--mainColor);
				}
			`}</style>
		</div>
	);
};

export default Keyword;
