// components/TopNav.tsx
"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./navigation.module.css";
import { useSelectedItem } from "@/providers/SelectedItemProvider";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import BlackButton from "../button/BlackButton";

export const TopNav: React.FC = () => {
	const currentRoute = usePathname();
	const { selectedItemName } = useSelectedItem();
	const { subTitle } = useContext(SubTitleContext);

	const routeTitles: { [key: string]: { title: string; iconSrc: string } } = {
		"/RS/main": {
			title: "홈",
			iconSrc: "/images/icon/png/ico_RS_home.png",
		},
		"/RS/explore": {
			title: "탐색",
			iconSrc: "/images/icon/png/ico_RS_explore.png",
		},
		"/RS/my/likeList": {
			title: "myHiRes",
			iconSrc: "/images/icon/png/ico_RS_my.png",
		},
		"/RS/my/playList": {
			title: "myHiRes",
			iconSrc: "/images/icon/png/ico_RS_my.png",
		},
		// 기타 경로와 제목, 아이콘 설정
	};

	const { title, iconSrc } = routeTitles[currentRoute] || {
		title: "",
		iconSrc: "",
	};

	let firstPath = true;

	// 현재 경로가 '/RS/track'를 포함하면 첫 번째 경로와 아이콘을 보여주지 않습니다.
	if (currentRoute.includes("/RS/track")) {
		firstPath = false;
	}

	// 선택된 타이틀을 설정합니다.
	// '/RS/track' 경로에 있지 않을 경우에만 displayTitle을 설정합니다.
	let displayTitle: React.ReactNode = firstPath ? (
		selectedItemName
	) : (
		<span className={style.topNavAlbumTit}>{subTitle}</span>
	);

	return (
		<div className={style.topNav}>
			{firstPath && iconSrc && (
				<Image src={iconSrc} alt={title} width={24} height={24} />
			)}
			{firstPath && (
				<>
					<span className={style.firstPath}>{title}</span>
					<span className={style.secondPath}>{displayTitle}</span>
				</>
			)}

			{/* 아래 라인에서 조건부 렌더링을 통해 displayTitle을 제어합니다 - 앨범 타이틀만 보여줌 */}
			{!firstPath && displayTitle}

			<div className={style.funcButton}>
				<BlackButton
					buttonIcon="listRSPlay"
					buttonText="전체재생"
					onClick={() => console.log("전체재생이닷")}
				/>
				<BlackButton
					buttonIcon="listRSShuffle"
					buttonText="셔플재생"
					onClick={() => console.log("셔플재생이닷")}
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
