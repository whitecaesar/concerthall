import React, { useContext } from "react";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import BackButton from "@/component/atom/button/BackButton";
import style from "./navigation.module.css";

interface SubNavProps {
	title: string; // 타이틀을 위한 prop
}

const SubNav = ({ title }: SubNavProps) => {
	const { subTitle } = useContext(SubTitleContext);
	return (
		<nav id="nav" className={style.subNav}>
			<BackButton />
			<h3>{subTitle}</h3>
		</nav>
	);
};

export default SubNav;
