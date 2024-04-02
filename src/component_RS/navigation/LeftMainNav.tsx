"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./navigation.module.css";
import { useEffect, useState } from "react";

export const LeftMainNav = () => {
	const currentRoute = usePathname();
	const [subHideActive, setSubHideActive] = useState<boolean>(false);

	useEffect(() => {
		setSubHideActive(false);
	}, [currentRoute]);

	const toggleSubHide = (route: string) => {
		if (route === currentRoute) {
			setSubHideActive(!subHideActive);
		}
	};

	const navClassName = `${style.leftMain} ${
		subHideActive ? style.subHide : ""
	}`;

	return (
		<nav className={navClassName}>
			<ul>
				<li
					className={(style.link, currentRoute === "/RS/main" ? "active" : "")}
					onClick={() => toggleSubHide("/RS/main")}
				>
					<Link href="/RS/main" className={style.icoHome}>
						홈
					</Link>
				</li>
				<li
					className={
						(style.link, currentRoute === "/RS/explore" ? "active" : "")
					}
					onClick={() => toggleSubHide("/RS/explore")}
				>
					<Link href="/RS/explore" className={style.icoExplore}>
						탐색
					</Link>
				</li>
				<li
					className={
						(style.link,
						currentRoute === "/RS/my/playList" ||
						currentRoute === "/RS/my/likeList"
							? "active"
							: "")
					}
					onClick={() => {
						if (currentRoute === "/RS/my/playList") {
							toggleSubHide("/RS/my/playList");
						} else if (currentRoute === "/RS/my/likeList") {
							toggleSubHide("/RS/my/likeList");
						}
					}}
				>
					<Link
						href={
							currentRoute === "/RS/my/likeList"
								? "/RS/my/likeList"
								: "/RS/my/playList"
						}
						className={style.icoMy}
					>
						myHiRes
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftMainNav;
