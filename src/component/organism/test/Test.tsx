"use client";
import Button from "@/component/atom/button/Button";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import React, { useContext } from "react";

export default function Test() {
	const context = useContext(SubTitleContext);
	return (
		<>
			<div>{context.subTitle}</div>
			<Button type="button">테스트입니다!</Button>
			<Button icon="listPlay" type="button"></Button>
		</>
	);
}
