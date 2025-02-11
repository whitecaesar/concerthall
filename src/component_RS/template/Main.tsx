"use client";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { useRouter } from "next/navigation";
import TrackList from "../trackList/TrackList";
import AlbumList from "../albumList/AlbumList";

export default function Main({ slug }: { slug?: string }) {
	const { data, error, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});
	const { setSubTitle } = useContext(SubTitleContext);
	const router = useRouter();

	useEffect(() => {
		if (error) {
			console.error(error);
			return;
		}

		const path = data?.RECOMMEND_LIST.find((item) => `${item.ID}` === slug)?.ID;
		if (slug === "undefined" && path) {
			router.push(`/RS/main/${path}`);
		}
	}, [isFetched, error]);

	useEffect(() => {
		if (isFetched && data?.RECOMMEND_LIST) {
			const menuItems = data.RECOMMEND_LIST.map(
				(content: VIEWALL_LIST_TYPE, index: number) => ({
					mainId: content.ID,
					name: content.TITLE,
					type: "main",
					index: index,
				})
			);
			//setMenuItems(menuItems);
			if (menuItems.length > 0) {
				const selectedMenu = menuItems.find(
					(menu) => `${menu.mainId}` === slug
				);
				setSubTitle(selectedMenu?.name);
				//setSelectedMenuItem(selectedMenu || menuItems[0]);
			}
		}
	}, [isFetched]);

	return (
		<>
			{data?.RECOMMEND_LIST.filter((content) => `${content.ID}` === slug).map(
				(content, index) =>
					content ? (
						<React.Fragment key={index}>
							{content.TYPE === "TRACK" ? (
								<TrackList recommendList={content} isTitle={false} />
							) : (
								<AlbumList recommendList={content} isTitle={false} />
							)}
						</React.Fragment>
					) : null
			)}
		</>
	);
}
