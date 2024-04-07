"use client";
import React, { useContext, useEffect, useState } from "react";
import { MenuItem as TMenuItem, useMenu } from "@/providers/RSMenuProvider";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import {
	getExploreAxios,
	TCATEGORY_RES,
	CATEGORY_LIST_RESPONSE,
} from "@/services/explore/ExploreAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import TrackList from "../trackList/TrackList";

interface ExploreProps {
	slug?: string;
}

const Explore = ({ slug }: ExploreProps) => {
	const [categories, setCategories] = useState<TCATEGORY_RES[]>([]);
	const [recommendList, setRecommendList] = useState<VIEWALL_LIST_TYPE | null>(
		null
	);
	const { setMenuItems, menuItems, setSelectedMenuItem } = useMenu();
	const { setSubTitle } = useContext(SubTitleContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: CATEGORY_LIST_RESPONSE | void = await getExploreAxios();
				if (response) {
					setCategories(response.CATEGORY);
					if (response.RECOMMEND_LIST.length > 0) {
						setRecommendList(response.RECOMMEND_LIST[0]);
					}

					const newMenuItems = response.CATEGORY.flatMap((category) =>
						category.KEWORD.map(
							(keyword) =>
								({
									exploreId: keyword.KEY,
									name: keyword.NAME,
									type: "explore",
								} as TMenuItem)
						)
					);
					setMenuItems(newMenuItems);
				}
			} catch (error) {
				console.error("키워드를 불러오는 데 실패했습니다.", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (menuItems.length > 0) {
			const selectedMenu = menuItems.find(
				(menu) => `${menu.exploreId}` === slug
			);
			setSubTitle(selectedMenu?.name);
			setSelectedMenuItem(selectedMenu || menuItems[0]);
		}
	}, [menuItems]);

	return (
		<>
			{recommendList && (
				<TrackList recommendList={recommendList} isTitle={false} />
			)}
		</>
	);
};

export default Explore;
