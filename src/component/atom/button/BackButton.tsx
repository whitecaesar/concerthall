import React from "react";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/services/common";

const BackButton = () => {
	const router = useRouter();
	const goBackClick = () => {
		(window as any).HifiRose.Close();
		//router.back();
	};

	return (
		<>
			<button type="button" className="backBtn" onClick={goBackClick}></button>
			<style jsx>{`
				.backBtn {
					display: inline-block;
					width: 50px;
					height: 55px;
					background: url(/images/icon/png/icon_back_white.png) center center
						no-repeat;
					background-size: 20px;
				}
			`}</style>
		</>
	);
};

export default BackButton;
