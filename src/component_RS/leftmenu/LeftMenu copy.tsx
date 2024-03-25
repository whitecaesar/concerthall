"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./leftMenu.module.css";

export const LeftMenu = () => {
	const pathname = usePathname();

	// 현재 경로에서 숫자 부분만 추출합니다. 예: '/RS/130/main' 에서 '130'
	const match = pathname.match(/\/RS\/(\d+)/);
	const number = match ? match[1] : "defaultNumber";

	return (
		<nav className={style.leftMenu}>
			<ul>
				<li>
					<Link
						href={`/RS/${number}/main`}
						className={`${style.link} ${
							pathname.includes("/RS/${number}/main") ? style.active : ""
						}`}
					>
						홈
					</Link>
				</li>
				<li>
					<Link
						href={`/RS/${number}/explore`}
						className={`${style.link} ${
							pathname.includes("/RS/${number}/explore") ? style.active : ""
						}`}
					>
						탐색
					</Link>
				</li>
				<li>
					<Link
						href={`/RS/${number}/my`}
						className={`${style.link} ${
							pathname.includes("/RS/${number}/my") ? style.active : ""
						}`}
					>
						My
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftMenu;
