"use client";
import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@/component/molecule/menuItem/MenuItem";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { getCookie } from "@/services/common";

export interface Texts {
  playlist: string;
  bookmark: string;
  purchase: string;
}

export const purchaseTexts: { [key: string]: Texts } = {
  en: {
    playlist: "My Playlist",
    bookmark: "Bookmark",
    purchase: "Purchase List",
  },
  US: {
    playlist: "My Playlist",
    bookmark: "Bookmark",
    purchase: "Purchase List",
  },
  kr: {
    playlist: "재생 목록",
    bookmark: "즐겨찾기",
    purchase: "구매 목록",
  },
  KR: {
    playlist: "재생 목록",
    bookmark: "즐겨찾기",
    purchase: "구매 목록",
  },
  de: {
    playlist: "Meine Wiedergabeliste",
    bookmark: "Lesezeichen",
    purchase: "Einkaufsliste",
  },
  DE: {
    playlist: "Meine Wiedergabeliste",
    bookmark: "Lesezeichen",
    purchase: "Einkaufsliste",
  },
  es: {
    playlist: "Mi lista de reproducción",
    bookmark: "Marcador",
    purchase: "Lista de compras",
  },
  ES: {
    playlist: "Mi lista de reproducción",
    bookmark: "Marcador",
    purchase: "Lista de compras",
  },
  fr: {
    playlist: "Ma playlist",
    bookmark: "Marque-page",
    purchase: "Liste d'achats",
  },
  FR: {
    playlist: "Ma playlist",
    bookmark: "Marque-page",
    purchase: "Liste d'achats",
  },
  it: {
    playlist: "La mia playlist",
    bookmark: "Segnalibro",
    purchase: "Lista degli acquisti",
  },
  IT: {
    playlist: "La mia playlist",
    bookmark: "Segnalibro",
    purchase: "Lista degli acquisti",
  },
  nl: {
    playlist: "Mijn afspeellijst",
    bookmark: "Bladwijzer",
    purchase: "Aankooplijst",
  },
  NL: {
    playlist: "Mijn afspeellijst",
    bookmark: "Bladwijzer",
    purchase: "Aankooplijst",
  },
  ja: {
    playlist: "マイプレイリスト",
    bookmark: "ブックマーク",
    purchase: "購入リスト",
  },
  JP: {
    playlist: "マイプレイリスト",
    bookmark: "ブックマーク",
    purchase: "購入リスト",
  },
  zh: {
    playlist: "我的播放列表",
    bookmark: "书签",
    purchase: "购买清单",
  },
  CN: {
    playlist: "我的播放列表",
    bookmark: "书签",
    purchase: "购买清单",
  },
  tw: {
    playlist: "我的播放清單",
    bookmark: "書籤",
    purchase: "購買清單",
  },
  TW: {
    playlist: "我的播放清單",
    bookmark: "書籤",
    purchase: "購買清單",
  },
  ru: {
    playlist: "Мой плейлист",
    bookmark: "Закладки",
    purchase: "Список покупок",
  },
  RU: {
    playlist: "Мой плейлист",
    bookmark: "Закладки",
    purchase: "Список покупок",
  },
};


const MenuList = () => {
	const { setSubTitle } = useContext(SubTitleContext);

	const menuItemClick = (title: string) => () => {
		setSubTitle(title);
	};

	const [playlist, setPlaylist] = useState<string>(purchaseTexts.en.playlist);
	const [bookmark, setBookmark] = useState<string>(purchaseTexts.en.bookmark);
	const [purchase, setPurchase] = useState<string>(purchaseTexts.en.purchase);

	useEffect(() => {
		const lang = getCookie("lang") || "en"; // 기본값을 en으로 설정
		setPlaylist(purchaseTexts[lang]?.playlist || purchaseTexts.en.playlist);
		setBookmark(purchaseTexts[lang]?.bookmark || purchaseTexts.en.bookmark);
		setPurchase(purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase);
	}, [purchaseTexts]);

	return (
		<div className="menuList">
			<ul>
				<MenuItem
					href={`/my/playList?title=${encodeURIComponent(playlist)}`}
					iconName="playList"
				>
					{playlist}
				</MenuItem>
				<MenuItem
					href={`/my/likeList?title=${encodeURIComponent(bookmark)}`}
					iconName="likeList"
				>
					{bookmark}
				</MenuItem>
				<MenuItem
					href={`/my/purchaseList?title=${encodeURIComponent(purchase)}`}
					iconName="purchaseList"
				>
					{purchase}
				</MenuItem>
			</ul>
		</div>
	);
};

export default MenuList;
