"use client";
import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@/component/molecule/menuItem/MenuItem";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { getCookie } from "@/services/common";

interface Texts {
	playlist: string;
	bookmark: string;
	purchase: string;
}

const texts: { [key: string]: Texts } = {
	en: {
	  playlist: "My Playlist",
	  bookmark: "Bookmark",
	  purchase: "Purchase List",
	},
	kr: {
	  playlist: "재생 목록",
	  bookmark: "즐겨찾기",
	  purchase: "구매 목록",
	},
	de: {
	  playlist: "Meine Wiedergabeliste",
	  bookmark: "Lesezeichen",
	  purchase: "Einkaufsliste",
	},
	jp: {
	  playlist: "マイプレイリスト",
	  bookmark: "ブックマーク",
	  purchase: "購入リスト",
	},
	fr: {
	  playlist: "Ma playlist",
	  bookmark: "Marque-page",
	  purchase: "Liste d'achats",
	},
	zh: {
	  playlist: "我的播放列表",
	  bookmark: "书签",
	  purchase: "购买清单",
	},
  };
  


const MenuList = () => {
	const { setSubTitle } = useContext(SubTitleContext);

	const menuItemClick = (title: string) => () => {
		setSubTitle(title);
	};

	const [playlist, setPlaylist] = useState<string>(texts.en.playlist);
	const [bookmark, setBookmark] = useState<string>(texts.en.bookmark);
	const [purchase, setPurchase] = useState<string>(texts.en.purchase);

	useEffect(() => {
		const lang = getCookie("lang") || "en"; // 기본값을 en으로 설정
		setPlaylist(texts[lang]?.playlist || texts.en.playlist);
		setBookmark(texts[lang]?.bookmark || texts.en.bookmark);
		setPurchase(texts[lang]?.purchase || texts.en.purchase);

	}, [texts]);



	return (
		<div className="menuList">
			<ul>
				<MenuItem
					href="/my/playList"
					iconName="playList"
					onClick={menuItemClick(playlist)}
				>
					{playlist}
				</MenuItem>
				<MenuItem
					href="/my/likeList"
					iconName="likeList"
					onClick={menuItemClick(bookmark)}
				>
					{bookmark}
				</MenuItem>
			</ul>
		</div>
	);
};

export default MenuList;
