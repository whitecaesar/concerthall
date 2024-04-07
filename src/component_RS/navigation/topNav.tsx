"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./navigation.module.css";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import BlackButton from "../button/BlackButton";

// 현재 경로에 대한 정보를 가져오는 함수를 컴포넌트 외부로 이동
const getRouteInfo = (pathname: string) => {
	const routeTitles: { [key: string]: { title: string; iconSrc: string } } = {
		"/RS/main/": {
			title: "홈",
			iconSrc: "/images/icon/png/ico_RS_home.png",
		},
		"/RS/explore/": {
			title: "탐색",
			iconSrc: "/images/icon/png/ico_RS_explore.png",
		},
		"/RS/my/": {
			title: "myHiRes",
			iconSrc: "/images/icon/png/ico_RS_my.png",
		},
	};
	const routeKey = Object.keys(routeTitles).find((key) =>
		pathname.startsWith(key)
	);
	if (routeKey !== undefined) {
		const { title, iconSrc } = routeTitles[routeKey];
		return { title, iconSrc };
	} else {
		return { title: "", iconSrc: "" };
	}
};

export const TopNav: React.FC = () => {
	const currentRoute = usePathname();
	const { subTitle } = useContext(SubTitleContext);

	const pathname = usePathname();

	const { title, iconSrc } = getRouteInfo(pathname);

	let firstPath = true;

	// 현재 경로가 '/RS/track'를 포함하면 첫 번째 경로와 아이콘을 보여주지 X.
	if (currentRoute.includes("/RS/track")) {
		firstPath = false;
	}

	return (
		<div className={style.topNav}>
			{firstPath && iconSrc && (
				<Image src={iconSrc} alt={title} width={24} height={24} />
			)}
			{firstPath ? (
				<>
					<span className={style.firstPath}>{title}</span>
					<span className={style.secondPath}>{subTitle}</span>
				</>
			) : (
				<>
					{/* 앨범 타이틀만 보여줌 */}
					<span className={style.topNavAlbumTit}>{subTitle}</span>
				</>
			)}

			<div className={style.funcButton}>
				<BlackButton
					buttonIcon="listRSPlay"
					buttonText="전체재생"
					onClick={() => {}}
				/>
				<BlackButton
					buttonIcon="listRSShuffle"
					buttonText="셔플재생"
					onClick={() => {}}
				/>
			</div>
			<button type="button" className={style.logoRose}>
				<Image
					src="/images/icon/png/ico_RS_logo.png"
					width={51.3}
					height={57.95}
					alt="로즈로고"
					//layout="responsive"
				/>
			</button>
		</div>
	);
};

export default TopNav;
