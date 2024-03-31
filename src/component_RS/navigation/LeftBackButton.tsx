import React from "react";
import { useRouter } from "next/navigation";
import style from "./navigation.module.css";

const LeftBackButton = () => {
	const router = useRouter();
	const goBackClick = () => {
		router.back();
	};

	return (
		<>
			<div className={style.leftBackButton}>
				<button
					type="button"
					className={style.backBtn}
					onClick={goBackClick}
				></button>
			</div>
		</>
	);
};

export default LeftBackButton;
