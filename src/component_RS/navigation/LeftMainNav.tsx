"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./navigation.module.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { getExploreAxios } from "@/services/explore/ExploreAxios";
import { useSelectedItem } from "@/providers/SelectedItemProvider";
import { useMenu } from "@/providers/RSMenuProvider";

export const LeftMainNav = () => {
	const currentRoute = usePathname();
	const [mainFirstIdx, setMainFirstIdx] = useState<string>();
	const [exploreFirstIdx, setExploreFirstIdx] = useState<string | undefined>();
	const [subHideActive, setSubHideActive] = useState<boolean>(false);
	const { selectedMenuItem } = useMenu();
	const mainData = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});

	const exploreData = useQuery({
		queryKey: ["EXPLORE-PAGE"],
		queryFn: getExploreAxios,
	});

	useEffect(() => {
		console.log("data?.RECOMMEND_LIST ", mainData.data?.RECOMMEND_LIST);
		mainData.data?.RECOMMEND_LIST &&
			setMainFirstIdx(mainData.data?.RECOMMEND_LIST[0].ID);
		// data?.RECOMMEND_LIST && setMainFirstIdx(data?.RECOMMEND_LIST[0].ID);
	}, [mainData.isFetched]);

	useEffect(() => {
		console.log("data?.CATEGORY ", exploreData.data?.CATEGORY);
		exploreData.data?.CATEGORY &&
			setExploreFirstIdx(exploreData?.data?.CATEGORY[0].KEWORD[0].KEY);
		// data?.RECOMMEND_LIST && setMainFirstIdx(data?.RECOMMEND_LIST[0].ID);
	}, [exploreData.isFetched]);

	useEffect(() => {
		setSubHideActive(false);
	}, [currentRoute]);

	const toggleSubHide = (route: string) => {
		if (route === currentRoute) {
			setSubHideActive(!subHideActive);
		}
	};
	const navClassName = `${style.leftMain} ${
		subHideActive ? style.subHide : ""
	}`;

	return (
		<nav className={navClassName}>
			<ul>
				<li
					className={
						(style.link, currentRoute.indexOf("/RS/main") > -1 ? "active" : "")
					}
					onClick={() => {
						mainData.isFetched &&
							toggleSubHide(
								`/RS/main/${
									typeof selectedMenuItem?.mainId === "undefined"
										? mainFirstIdx
										: selectedMenuItem?.mainId
								}`
							);
					}}
				>
					<Link
						href={`/RS/main/${
							typeof selectedMenuItem?.mainId === "undefined"
								? mainFirstIdx
								: selectedMenuItem?.mainId
						}`}
						className={style.icoHome}
					>
						홈
					</Link>
				</li>
				<li
					className={
						(style.link,
						currentRoute.indexOf("/RS/explore") > -1 ? "active" : "")
					}
					onClick={() =>
						toggleSubHide(
							`/RS/explore/${
								typeof selectedMenuItem?.exploreId === "undefined"
									? exploreFirstIdx
									: selectedMenuItem?.exploreId
							}`
						)
					}
				>
					<Link
						href={`/RS/explore/${
							typeof selectedMenuItem?.exploreId === "undefined"
								? exploreFirstIdx
								: selectedMenuItem?.exploreId
						}`}
						className={style.icoExplore}
					>
						탐색
					</Link>
				</li>
				<li
					className={
						(style.link, currentRoute.startsWith("/RS/my/") ? "active" : "")
					}
					onClick={() => toggleSubHide(currentRoute)}
				>
					<Link
						href={
							currentRoute.startsWith("/RS/my/likeList")
								? "/RS/my/likeList"
								: "/RS/my/playList"
						}
						className={style.icoMy}
					>
						myHiRes
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftMainNav;
