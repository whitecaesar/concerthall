import React, { useContext, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { useMenu } from "@/providers/RSMenuProvider";
import { useSelectedItem } from "@/providers/SelectedItemProvider";
import style from "./navigation.module.css";

interface SubNavProps {
	title?: string;
}

const SubNav = ({ title }: SubNavProps) => {
	const { subTitle } = useContext(SubTitleContext);
	const { menuItems, setSelectedMenuItem } = useMenu();
	const pathname = usePathname();
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const { setSelectedItemName } = useSelectedItem();

	const isMainPage = pathname === "/RS/main";
	const isExplorePage = pathname.startsWith("/RS/explore");
	const isMyPage = pathname.startsWith("/RS/my");

	const myPageSubMenus = useMemo(
		() => [
			{ name: "MY 플레이리스트", path: "/RS/my/playList" },
			{ name: "즐겨찾기", path: "/RS/my/likeList" },
		],
		[]
	);

	useEffect(() => {
		const currentMenuItems = isMyPage ? myPageSubMenus : menuItems;
		if (currentMenuItems.length > 0) {
			setSelectedItemName(currentMenuItems[0].name);
			setActiveIndex(0); // 첫 번째 메뉴 아이템을 활성화
		}
	}, [isMyPage, menuItems, myPageSubMenus, setSelectedItemName]);

	const handleItemClick = (index: number) => {
		setActiveIndex(index);
		const selectedItem = isMyPage ? myPageSubMenus[index] : menuItems[index];
		setSelectedItemName(selectedItem.name);
		setSelectedMenuItem(selectedItem);
	};

	return (
		<nav className={style.leftSub}>
			<ul>
				{/* 메뉴 아이템 렌더링 */}
				{isMainPage &&
					menuItems.map((item, index) => (
						<li
							key={index}
							className={index === activeIndex ? style.active : ""}
							onClick={() => handleItemClick(index)}
						>
							{item.name}
						</li>
					))}
				{isExplorePage &&
					menuItems.map((item, index) => (
						<li
							key={index}
							className={index === activeIndex ? style.active : ""}
							onClick={() => handleItemClick(index)}
						>
							{item.name}
						</li>
					))}
				{isMyPage &&
					myPageSubMenus.map((item, index) => (
						<li
							key={index}
							className={pathname === item.path ? style.active : ""}
							onClick={() => handleItemClick(index)}
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
