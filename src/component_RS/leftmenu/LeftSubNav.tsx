import React, { useContext } from "react";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./leftMenu.module.css";

interface SubNavProps {
	title: string; // 타이틀을 위한 prop
}

const LeftSubNav = ({ title }: SubNavProps) => {
	const { subTitle } = useContext(SubTitleContext);

	return (
		<nav className={style.leftSub}>
			<a href="#">{subTitle || title}</a>
		</nav>
	);
};

export default LeftSubNav;
