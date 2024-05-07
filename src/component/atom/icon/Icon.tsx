import React from "react";
import style from "./icon.module.css";

interface IconProps {
	iconName: string;
	onClick?: () => void;
}

const Icon = ({iconName, onClick}: IconProps) => {
	//const { iconName } = props;
	return <i className={`${style.icon} ${style[iconName]}`} onClick={onClick}></i>;
};

export default Icon;
