import React from "react";

const FuncButton = () => {
	const funcClick = () => {
		// 버튼 클릭 시 실행할 로직
		console.log("음악 재생");
	};

	return (
		<>
			<button type="button" className="funcBtn" onClick={funcClick}></button>
			<style jsx>{`
				.funcBtn {
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url(/images/icon/png/icon_option.png) center center
						no-repeat;
					background-size: contain;
				}
			`}</style>
		</>
	);
};

export default FuncButton;
