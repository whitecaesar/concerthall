"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./navigation.module.css";
import { useEffect, useState } from "react";
import { getCookie } from "@/services/common";

interface Texts {
	home: string;
	explore: string;
	my: string;
}

const texts: { [key: string]: Texts } = {
	en: {
		home: "Home",
		explore: "Exploration",
		my: "myHiRes",
	},
	kr: {
		home: "홈",
		explore: "탐색",
		my: "myHiRes",
	},
	de: {
		home: "Startseite",
		explore: "Erkunden",
		my: "myHiRes",
	},
	jp: {
		home: "ホーム",
		explore: "探検",
		my: "myHiRes",
	},
	fr: {
		home: "Accueil",
		explore: "Explorer",
		my: "myHiRes",
	},
	zh: {
		home: "主页",
		explore: "探索",
		my: "myHiRes",
	},
};

export default function MainNav() {
	const currentRoute = usePathname();

	const [home, setHome] = useState<string>(texts.en.home);
	const [explore, setExplore] = useState<string>(texts.en.explore);
	const [my, setMy] = useState<string>(texts.en.my);

	useEffect(() => {
		const lang = getCookie("lang") || "en"; // 기본값을 en으로 설정
		setHome(texts[lang]?.home || texts.en.home);
		setExplore(texts[lang]?.explore || texts.en.explore);
		setMy(texts[lang]?.my || texts.en.my);

	}, [texts]);

	return (
		<nav id="nav" className={style.mainNav}>
			<ul>
				<li className={(style.link, currentRoute === "/main" ? "active" : "")}>
					<Link href="/main">{home}</Link>
				</li>
				<li
					className={(style.link, currentRoute === "/explore" ? "active" : "")}
				>
					<Link href="/explore">{explore}</Link>
				</li>
				<li className={(style.link, currentRoute === "/my" ? "active" : "")}>
					<Link href="/my">{my}</Link>
				</li>
			</ul>
		</nav>
	);
}
