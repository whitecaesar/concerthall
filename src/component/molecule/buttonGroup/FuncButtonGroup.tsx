"use client";

import React from "react";
import Button from "@/component/atom/button/Button";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";

const FuncButtonGroup = () => {
	return (
		<>
			<div className="FuncButtonGroup">
				<LikeButton />
				<Button
					type="button"
					icon="addFolder"
					onClick={() => console.log("플레이리스트 추가")}
				/>
				<FuncButton />
			</div>
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
		</>
	);
};

export default FuncButtonGroup;
