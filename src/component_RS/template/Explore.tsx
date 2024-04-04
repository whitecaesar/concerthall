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
				// api 각 요청하는 genre 1개씩만 리턴
				const response: CATEGORY_LIST_RESPONSE | void = await getExploreAxios();
				if (response) {
					setCategories(response.CATEGORY);
					if (response.RECOMMEND_LIST.length > 0) {
						setRecommendList(response.RECOMMEND_LIST[0]);
					}

					// 모든 카테고리의 키워드를 전역 메뉴 아이템으로 설정
					console.log("response.CATEGORY", response.CATEGORY);
					const newMenuItems = response.CATEGORY.flatMap((category) =>
						category.KEWORD.map((keyword, index) => {
							console.log("category ", keyword, index);
							return {
								exploreId: keyword.KEY,
								name: keyword.NAME,
								type: "explore",
							} as TMenuItem;
						})
					);
					setMenuItems(newMenuItems);
				}
			} catch (error) {
				console.error("키워드를 불러오는 데 실패했습니다.", error);
			}
		};

		fetchData();
	}, [setMenuItems]);

	useEffect(() => {
		if (menuItems.length > 0) {
			setSubTitle(menuItems.find((menu) => `${menu.exploreId}` === slug)?.name);
			setSelectedMenuItem(
				slug
					? menuItems.filter((menu) => `${menu.exploreId}` === slug)[0]
					: menuItems[0]
			);
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
