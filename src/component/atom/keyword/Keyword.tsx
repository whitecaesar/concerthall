"use client";
import { TKEYWORD_INFO } from "@/services/explore/ExploreAxios";
import React, { useState } from "react";

interface KeywordProps {
	keywordInfo: TKEYWORD_INFO;
	onClick: () => void;
}

const Keyword = ({ keywordInfo, onClick }: KeywordProps) => {
	const [isActive, setIsActive] = useState(false);

	const keywordClick = () => {
		setIsActive(false);
		onClick();
	};

	return (
		<div>
			<button className="keyword" onClick={keywordClick}>
				{keywordInfo.NAME}
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
					&:active,
					&:hover {
						background: var(--mainColor);
						transition: all 0.25s;
					}
				}
				.keyword:active,
				.keyword:hover {
					background: var(--mainColor);
				}
			`}</style>
		</div>
	);
};

export default Keyword;
