import React from "react";

const RoundShuffleButton = () => {
	const playClick = () => {
		// 버튼 클릭 시 실행할 로직
		console.log("트랙 셔플로 재생");
	};

	return (
		<>
			<button
				type="button"
				className="trackShuffleBtn"
				onClick={playClick}
			></button>
			<style jsx>{`
				.trackShuffleBtn {
					display: inline-block;
					width: 40px;
					height: 40px;
					background: url(/images/icon/png/icon_track_shuffle.png) center center
						no-repeat;
					background-size: contain;
					margin-left: 12px;
				}
			`}</style>
		</>
	);
};

export default RoundShuffleButton;
