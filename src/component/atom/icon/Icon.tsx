import React from "react";
import style from "./icon.module.css";

interface IconProps {
	iconName: string;
}

const Icon = (props: IconProps) => {
	const { iconName } = props;

	return <i className={`${style.icon} ${style[iconName]}`}></i>;
};

export default Icon;
