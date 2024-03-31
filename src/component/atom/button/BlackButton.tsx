"use client";

import React from "react";
import Icon from "../../../component_RS/button/icon/Icon";

interface ButtonProps {
	buttonText: string;
	buttonIcon: string;
	onClick: () => void;
}

const BlackButton = (props: ButtonProps) => {
	return (
		<>
			<button type="button" onClick={props.onClick} className="blackBtn">
				<Icon iconName={props.buttonIcon} />
				{props.buttonText}
			</button>
			<style jsx>{`
				.blackBtn {
					color: #fff;
					background: #000;
					border: 1px solid var(--borderDark);
					border-radius: 5px;
					width: 100%;
					height: 45px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 14px;
					i {
						margin-right: 8px;
					}
				}
			`}</style>
		</>
	);
};

export default BlackButton;
