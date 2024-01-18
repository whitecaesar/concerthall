"use client";

import React from "react";
import BlackButton from "@/component/atom/button/BlackButton";
const PlayButtonGroup = () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "10px",
					padding: "15px",
				}}
			>
				<BlackButton
					buttonIcon="listPlay"
					buttonText="전체재생"
					onClick={() => console.log("전체재생이닷")}
				/>
				<BlackButton
					buttonIcon="listShuffle"
					buttonText="셔플재생"
					onClick={() => console.log("셔플재생이닷")}
				/>
			</div>
		</>
	);
};

export default PlayButtonGroup;
