"use client";

import React from "react";
import Icon from "./icon/Icon";

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
			</button>
		</>
	);
};

export default BlackButton;
