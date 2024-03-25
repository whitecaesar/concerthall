"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./leftMenu.module.css";

export const LeftMainNav = () => {
	const currentRoute = usePathname();

	return (
		<nav className={style.leftMain}>
			<ul>
				<li
					className={`${style.link} ${
						currentRoute === "/main" ? "active" : ""
					}`}
				>
					<Link href="/main">홈</Link>
				</li>
				<li
					className={`${style.link} ${
						currentRoute === "/explore" ? "active" : ""
					}`}
				>
					<Link href="/explore">탐색</Link>
				</li>
				<li
					className={`${style.link} ${currentRoute === "/my" ? "active" : ""}`}
				>
					<Link href="/my">myHiRes</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftMainNav;
