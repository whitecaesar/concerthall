// FuncButtonGroup.tsx
"use client";
import React from "react";
import LikeButton from "@/component/atom/button/LikeButton";
import Button from "@/component/atom/button/Button";
import FuncButton from "@/component/atom/button/FuncButton";

const FuncButtonGroup = () => {
	return (
		<div className="FuncButtonGroup">
			<LikeButton />
			<Button
				type="button"
				icon="addFolder"
				onClick={() => console.log("Adding to playlist")}
			/>
			<FuncButton funcClick={() => {}} />
			{/* 기능 로직 넣으세요. */}
			<style jsx>{`
				.FuncButtonGroup {
					display: flex;
					justify-content: space-around;
					gap: 10px;
					padding: 15px;
					border-bottom: 1px solid var(--borderDark);
					i {
						width: 20px;
						height: 20px;
					}
				}
			`}</style>
		</div>
	);
};

export default FuncButtonGroup;
