"use client";
import { usePathname } from "next/navigation";
import React from "react";
import MainNav from "@/component/molecule/navigation/MainNav";
import SubNav from "@/component/molecule/navigation/SubNav";

export default function Header() {
	const path = usePathname();
	const ynMainNav = path === "/my" || path === "/explore" || path === "/main";
	return <>{ynMainNav ? <MainNav /> : <SubNav title="타이틀" />}</>;
}
