"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import TrackList from "../trackList/TrackList";
import AlbumList from "../albumList/AlbumList";
import { useMenu } from "@/providers/RSMenuProvider";

export default function Main() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});

	// Main 컴포넌트 내에서
	const { menuItems, setMenuItems, selectedMenuItem, setSelectedMenuItem } =
		useMenu(); // 수정: selectedMenuItem도 가져옵니다.

	useEffect(() => {
		// 데이터가 fetch 되었고, 데이터 배열이 존재한다면 메뉴 항목을 업데이트합니다.
		if (isFetched && data?.RECOMMEND_LIST) {
			const menuItems = data.RECOMMEND_LIST.map(
				(content: VIEWALL_LIST_TYPE) => ({
					name: content.TITLE,
					path: content.PATH,
				})
			);
			setMenuItems(menuItems);

			// 메뉴 아이템들을 업데이트 한 후, 첫 번째 메뉴 아이템을 기본적으로 선택합니다.
			if (menuItems.length > 0) {
				setSelectedMenuItem(menuItems[0]);
			}
		}
	}, [data, isFetched, setMenuItems, setSelectedMenuItem]); // 의존성 배열에 setSelectedMenuItem 추가

	return (
		<>
			{data?.RECOMMEND_LIST.filter(
				(content) =>
					!selectedMenuItem || content.TITLE === selectedMenuItem.name // 현재 선택된 메뉴 아이템에 따라 필터링
			).map((content, index) => (
				<React.Fragment key={index}>
					{content.TYPE === "SINGLE" ? (
						<TrackList recommendList={content} isTitle={false} />
					) : (
						<AlbumList recommendList={content} isTitle={false} />
					)}
				</React.Fragment>
			))}
		</>
	);
}
