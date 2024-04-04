import React, { useContext, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { MenuItem, useMenu } from "@/providers/RSMenuProvider";
import { useSelectedItem } from "@/providers/SelectedItemProvider";
import style from "./navigation.module.css";

interface SubNavProps {
	title?: string;
}

const SubNav = ({ title }: SubNavProps) => {
	const { setSubTitle } = useContext(SubTitleContext);
	const { menuItems, selectedMenuItem, setSelectedMenuItem } = useMenu();
	const pathname = usePathname();
	const [activeIndex, setActiveIndex] = useState<MenuItem>();
	const { setSelectedItemName } = useSelectedItem();

	const isMainPage = pathname.startsWith("/RS/main");
	const isExplorePage = pathname.startsWith("/RS/explore");
	const isMyPage = pathname.startsWith("/RS/my");

	const myPageSubMenus = useMemo(
		() => [
			{ id: 0, name: "MY 플레이리스트", path: "/RS/my/playList", type: "my" },
			{ id: 1, name: "즐겨찾기", path: "/RS/my/likeList", type: "my" },
		],
		[]
	);

	const handleItemClick = (menu: MenuItem) => {
		setActiveIndex(
			menuItems.find((item) => {
				if (item.type === "main") {
					return item.mainId === menu?.mainId;
				}
				if (item.type === "explore") {
					return item.exploreId === menu?.exploreId;
				}
				if (item.type === "my") {
					return item.myId === menu?.myId;
				}
			})
		);
		setSubTitle(menu.name);
	};

	return (
		<nav className={style.leftSub}>
			<ul>
				{isMainPage &&
					menuItems.map((item, index) => (
						<li
							key={`li-${index}`}
							className={
								item.mainId === selectedMenuItem?.mainId ? style.active : ""
							}
							onClick={() => handleItemClick(item)}
						>
							<Link key={item.mainId} href={`/RS/main/${item.mainId}`}>
								{item.name}
							</Link>
						</li>
					))}
				{isExplorePage &&
					menuItems.map((item, index) => (
						<li
							key={`li-${index}`}
							className={
								item.exploreId === selectedMenuItem?.exploreId
									? style.active
									: ""
							}
							onClick={() => handleItemClick(item)}
						>
							<Link key={item.exploreId} href={`/RS/explore/${item.exploreId}`}>
								{item.name}
							</Link>
						</li>
					))}
				{isMyPage &&
					myPageSubMenus.map((item, index) => (
						<li
							key={index}
							className={pathname === item.path ? style.active : ""}
							onClick={() => handleItemClick(item)}
						>
							<Link href={item.path}>{item.name}</Link>
						</li>
					))}
				{!isMainPage && !isMyPage && !isExplorePage && (
					<li>
						<h3>{title}</h3>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default SubNav;
