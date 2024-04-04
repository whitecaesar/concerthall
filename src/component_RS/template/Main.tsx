"use client";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import { useMenu } from "@/providers/RSMenuProvider";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { useRouter } from "next/navigation";
import TrackList from "../trackList/TrackList";
import AlbumList from "../albumList/AlbumList";

export default function Main({ slug }: { slug?: string }) {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});
	const { setSubTitle } = useContext(SubTitleContext);
	const { setMenuItems, setSelectedMenuItem } = useMenu();
	const router = useRouter();

	useEffect(() => {
		const path = data?.RECOMMEND_LIST.find((item) => {
			return `${item.ID}` === slug;
		})?.ID;
		slug === "undefined" &&
			router.push(`/RS/main/${path ? path : data?.RECOMMEND_LIST[0].ID}`);
	}, [isFetched]);

	useEffect(() => {
		// 데이터가 fetch 되었고, 데이터 배열이 존재한다면 메뉴 항목을 업데이트
		if (isFetched && data?.RECOMMEND_LIST) {
			const menuItems = data.RECOMMEND_LIST.map(
				(content: VIEWALL_LIST_TYPE, index: number) => ({
					mainId: content.ID,
					name: content.TITLE,
					//path: content.PATH,
					type: "main",
					index: index,
				})
			);
			menuItems.map((item) => console.log(item.name));
			setMenuItems(menuItems);
			// 메뉴 아이템들을 업데이트 한 후, 첫 번째 메뉴 아이템을 기본적으로 선택
			if (menuItems.length > 0) {
				setSubTitle(menuItems.find((menu) => `${menu.mainId}` === slug)?.name);
				setSelectedMenuItem(
					slug
						? menuItems.filter((menu) => `${menu.mainId}` === slug)[0]
						: menuItems[0]
				);
			}
		}
	}, [isFetched]);

	return (
		<>
			{data?.RECOMMEND_LIST.filter((content) => {
				return slug === `${content.ID}` && content;
			}).map((content, index) =>
				content ? (
					<React.Fragment key={index}>
						{content.TYPE === "SINGLE" ? (
							<TrackList recommendList={content} isTitle={false} />
						) : (
							<AlbumList recommendList={content} isTitle={false} />
						)}
					</React.Fragment>
				) : (
					<></>
				)
			)}
		</>
	);
}
