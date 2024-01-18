import React from "react";

const RoundPlayButton = () => {
	const playClick = () => {
		// 버튼 클릭 시 실행할 로직
		console.log("트랙 처음부터 재생");
	};

	return (
		<>
			<button
				type="button"
				className="trackPlayBtn"
				onClick={playClick}
			></button>
			<style jsx>{`
				.trackPlayBtn {
					display: inline-block;
					width: 56px;
					height: 56px;
					background: url(/images/icon/png/icon_track_play.png) center center
						no-repeat;
					background-size: contain;
					margin-left: 12px;
				}
			`}</style>
		</>
	);
};

export default RoundPlayButton;
