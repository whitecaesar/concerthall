"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./navigation.module.css";

export default function MainNav() {
	const currentRoute = usePathname();

	return (
		<nav id="nav" className={style.mainNav}>
			<ul>
				<li className={(style.link, currentRoute === "/main" ? "active" : "")}>
					<Link href="/main">홈</Link>
				</li>
				<li
					className={(style.link, currentRoute === "/explore" ? "active" : "")}
				>
					<Link href="/explore">탐색</Link>
				</li>
				<li className={(style.link, currentRoute === "/my" ? "active" : "")}>
					<Link href="/my">myHiRes</Link>
				</li>
			</ul>
		</nav>
	);
}
