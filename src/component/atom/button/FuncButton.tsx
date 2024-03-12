const FuncButton = (props: { funcClick: () => void }) => {
	return (
		<>
			<button
				type="button"
				className="funcBtn"
				onClick={props.funcClick}
			></button>
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
