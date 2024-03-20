"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./leftMenu.module.css";

export const LeftMenu = () => {
	const currentRoute = usePathname();

	return (
		<nav className={style.leftMenu}>
			<ul>
				<li
					className={(style.link, currentRoute === "/RS/main" ? "active" : "")}
				>
					<Link href="/RS/main">홈</Link>
				</li>
				<li
					className={
						(style.link, currentRoute === "/RS/explore" ? "active" : "")
					}
				>
					<Link href="/RS/explore">탐색</Link>
				</li>
				<li className={(style.link, currentRoute === "/RS/my" ? "active" : "")}>
					<Link href="/RS/my">my</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftMenu;
