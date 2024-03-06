"use client";
import { useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import MainNav from "@/component/molecule/navigation/MainNav";
import SubNav from "@/component/molecule/navigation/SubNav";

export default function Header() {
	const path = usePathname();
	const ynMainNav = useMemo(
		() => path === "/my" || path === "/explore" || path === "/main",
		[path]
	);

	useEffect(() => {
		// path 변수가 변경될 때 특정 작업을 수행
	}, [path]);

	return <>{ynMainNav ? <MainNav /> : <SubNav title="타이틀" />}</>;
}
