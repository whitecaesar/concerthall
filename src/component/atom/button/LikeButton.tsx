import React, { useState } from "react";

const LikeButton = () => {
	const [number, setNumber] = useState<number>(0);

	const likeClick = () => {
		setNumber((likeNum) => (likeNum + 1) % 4);
	};

	return (
		<>
			<button onClick={likeClick} className={`likeBtn${number}`}></button>
			<style jsx>{`
				.likeBtn0,
				.likeBtn1,
				.likeBtn2,
				.likeBtn3 {
					display: inline-block;
					width: 20px;
					height: 20px;
					background-size: contain;
					background-position: center center;
					background-repeat: no-repeat;
				}
				.likeBtn0 {
					background-image: url(/images/icon/png/icon_heart_0.png);
				}
				.likeBtn1 {
					background-image: url(/images/icon/png/icon_heart_1.png);
				}
				.likeBtn2 {
					background-image: url(/images/icon/png/icon_heart_2.png);
				}
				.likeBtn3 {
					background-image: url(/images/icon/png/icon_heart_3.png);
				}
			`}</style>
		</>
	);
};

export default LikeButton;
