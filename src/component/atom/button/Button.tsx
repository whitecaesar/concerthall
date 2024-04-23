import React from "react";
import Icon from "../icon/Icon";
import style from "./button.module.css";

type buttonPropsType = {
	id?: string;
	name?: string;
	type: "submit" | "button" | "reset" | undefined;
	children?: React.ReactNode;
	icon?: string;
	text?: string;
	className?: string;
	onClick?: () => void | undefined | unknown;
};

export default function Button({ children, ...props }: buttonPropsType) {
	const buttonClass = props.className ? style[props.className] : "";
	return (
		<button {...props} className={buttonClass}>
			{props.icon && <Icon iconName={props?.icon} />}
			{children}
			{props.text}
		</button>
	);
}
