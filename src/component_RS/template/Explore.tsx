"use client";
import React, { useEffect, useState } from "react";
import { useMenu } from "@/providers/RSMenuProvider";
import {
	getExploreAxios,
	TCATEGORY_RES,
	CATEGORY_LIST_RESPONSE,
} from "@/services/explore/ExploreAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import TrackList from "../trackList/TrackList";

interface ExploreProps {}

const Explore = (props: ExploreProps) => {
	const [categories, setCategories] = useState<TCATEGORY_RES[]>([]);
	const [recommendList, setRecommendList] = useState<VIEWALL_LIST_TYPE | null>(
		null
	);
	const { setMenuItems } = useMenu(); // 전역 메뉴 상태 업데이트 함수 사용

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: CATEGORY_LIST_RESPONSE | void = await getExploreAxios();
				if (response) {
					setCategories(response.CATEGORY);
					if (response.RECOMMEND_LIST.length > 0) {
						setRecommendList(response.RECOMMEND_LIST[0]);
					}

					// 모든 카테고리의 키워드를 전역 메뉴 아이템으로 설정
					const newMenuItems = response.CATEGORY.flatMap((category) =>
						category.KEWORD.map((keyword) => ({
							name: keyword.NAME,
							path: `/RS/explore/result?keyword=${keyword.NAME}`,
						}))
					);
					setMenuItems(newMenuItems);
				}
			} catch (error) {
				console.error("키워드를 불러오는 데 실패했습니다.", error);
			}
		};

		fetchData();
	}, [setMenuItems]); // setMenuItems를 의존성 배열에 추가

	return (
		<>
			{recommendList && (
				<TrackList recommendList={recommendList} isTitle={false} />
			)}
		</>
	);
};

export default Explore;
