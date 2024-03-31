// components/TopNav.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./navigation.module.css";
import { useSelectedItem } from "@/providers/SelectedItemProvider";
import RoundPlayButton from "@/component/atom/button/RoundPlayButton";
import RoundShuffleButton from "@/component/atom/button/RoundSuffleButton";
import BlackButton from "../button/BlackButton";

export const TopNav: React.FC = () => {
	const currentRoute = usePathname();
	const { selectedItemName } = useSelectedItem(); // 컨텍스트에서 선택된 아이템의 이름을 사용

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

	return (
		<div className={style.topNav}>
			{iconSrc && <Image src={iconSrc} alt={title} width={24} height={24} />}
			<span className={style.firstPath}>{title}</span>
			{/* 선택된 아이템 이름을 추가로 표시 */}
			<span className={style.secondPath}>{selectedItemName}</span>

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
					layout="responsive"
				/>
			</button>
		</div>
	);
};

export default TopNav;
