"use client";
import React, { useContext } from "react";
import MenuItem from "@/component/molecule/menuItem/MenuItem";
import { SubTitleContext } from "@/providers/SubTitleProvider";

const MenuList = () => {
	const { setSubTitle } = useContext(SubTitleContext);

	const menuItemClick = (title: string) => () => {
		setSubTitle(title);
	};

	return (
		<div className="menuList">
			<ul>
				<MenuItem
					href="/my/playList"
					iconName="playList"
					onClick={menuItemClick("My 플레이리스트")}
				>
					My 플레이리스트
				</MenuItem>
				<MenuItem
					href="/my/likeList"
					iconName="likeList"
					onClick={menuItemClick("즐겨찾기")}
				>
					즐겨찾기
				</MenuItem>
			</ul>
		</div>
	);
};

export default MenuList;
