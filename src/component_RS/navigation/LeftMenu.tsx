"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import LeftMainNav from "./LeftMainNav";
import LeftSubNav from "./LeftSubNav";
import LeftBackButton from "./LeftBackButton";

export default function LeftMenu() {
	const pathname = usePathname(); // 현재 경로를 가져옵니다.

	const ynMainNav = useMemo(() => {
		return (
			pathname === "/RS/main" ||
			pathname === "/RS/explore" ||
			pathname === "/RS/my/likeList" ||
			pathname === "/RS/my/playList"
		);
	}, [pathname]);

	return (
		<>
			{!ynMainNav ? (
				<LeftBackButton />
			) : (
				<>
					<LeftMainNav />
					<LeftSubNav title="타이틀" />
				</>
			)}
		</>
	);
}
