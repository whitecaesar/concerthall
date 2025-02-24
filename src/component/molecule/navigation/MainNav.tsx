"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./navigation.module.css";
import { useEffect, useState } from "react";
import { getCookie } from "@/services/common";

export interface Texts {
  home: string;
  explore: string;
  my: string;
}

export const texts: { [key: string]: Texts } = {
  en: {
    home: "Home",
    explore: "Exploration",
    my: "myHiRes",
  },
  US: {
    home: "Home",
    explore: "Exploration",
    my: "myHiRes",
  },
  ko: {
    home: "홈",
    explore: "탐색",
    my: "myHiRes",
  },
  KR: {
    home: "홈",
    explore: "탐색",
    my: "myHiRes",
  },
  de: {
    home: "Startseite",
    explore: "Erkunden",
    my: "myHiRes",
  },
  DE: {
    home: "Startseite",
    explore: "Erkunden",
    my: "myHiRes",
  },
  es: {
    home: "Inicio",
    explore: "Exploración",
    my: "myHiRes",
  },
  ES: {
    home: "Inicio",
    explore: "Exploración",
    my: "myHiRes",
  },
  fr: {
    home: "Accueil",
    explore: "Explorer",
    my: "myHiRes",
  },
  FR: {
    home: "Accueil",
    explore: "Explorer",
    my: "myHiRes",
  },
  it: {
    home: "Home",
    explore: "Esplora",
    my: "myHiRes",
  },
  IT: {
    home: "Home",
    explore: "Esplora",
    my: "myHiRes",
  },
  nl: {
    home: "Startpagina",
    explore: "Ontdekken",
    my: "myHiRes",
  },
  NL: {
    home: "Startpagina",
    explore: "Ontdekken",
    my: "myHiRes",
  },
  ja: {
    home: "ホーム",
    explore: "探検",
    my: "myHiRes",
  },
  JP: {
    home: "ホーム",
    explore: "探検",
    my: "myHiRes",
  },
  zh: {
    home: "主页",
    explore: "探索",
    my: "myHiRes",
  },
  CN: {
    home: "主页",
    explore: "探索",
    my: "myHiRes",
  },
  tw: {
    home: "主頁",
    explore: "探索",
    my: "myHiRes",
  },
  TW: {
    home: "主頁",
    explore: "探索",
    my: "myHiRes",
  },
  ru: {
    home: "Главная",
    explore: "Исследовать",
    my: "myHiRes",
  },
  RU: {
    home: "Главная",
    explore: "Исследовать",
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
