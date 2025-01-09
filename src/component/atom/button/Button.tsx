// import React from "react";
// import Icon from "../icon/Icon";
// import style from "./button.module.css";

// type buttonPropsType = {
// 	id?: string;
// 	name?: string;
// 	type: "submit" | "button" | "reset" | undefined;
// 	children?: React.ReactNode;
// 	icon?: string;
// 	text?: string;
// 	className?: string;
// 	onClick?: () => void | undefined | unknown;
// };

// export default function Button({ children, ...props }: buttonPropsType) {
// 	const buttonClass = props.className ? style[props.className] : "";
// 	return (
// 		<button {...props} className={buttonClass}>
// 			{props.icon && <Icon iconName={props?.icon} />}
// 			{children}
// 			{props.text}
// 		</button>
// 	);
// }

import React from "react";
import Icon from "../icon/Icon";
import style from "./button.module.css";

type ButtonPropsType = {
	id?: string;
	name?: string;
	type: "submit" | "button" | "reset";
	children?: React.ReactNode;
	icon?: string;
	text?: string;
	className?: string; // 외부에서 전달된 클래스 이름
	onClick?: () => void;
};

export default function Button({
	children,
	className,
	...props
}: ButtonPropsType) {
	const buttonClass = `${style.button || ""} ${className || ""}`; // 기본 스타일과 외부 클래스 병합

	return (
		<button {...props} className={buttonClass}>
			{props.icon && <Icon iconName={props.icon} />}
			{children}
			{props.text}
		</button>
	);
}
