"use client";
import Button from "@/component/atom/button/Button";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

export default function Test() {
	const context = useContext(SubTitleContext);
	// context?.setSubTitle(`김이박최정 - ${usePathname()}`);
	return (
		<>
			<div>{context.subTitle}</div>
			<Button type="button">테스트입니다!</Button>
			<Button icon="listPlay" type="button"></Button>
		</>
	);
}
