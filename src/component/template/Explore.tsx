"use client";
import React, { useEffect, useState } from "react";
import KeywordList from "../organism/keywordList/KeywordList";
import SingleList from "../organism/singleList/SingleList";
import {
	getExploreAxios,
	TCATEGORY_RES,
	CATEGORY_LIST_RESPONSE, // getExploreAxios 함수의 반환 타입
} from "@/services/explore/ExploreAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";

// Explore 컴포넌트의 Props 타입 정의 (이 경우는 Props가 없지만 예시로 추가)
interface ExploreProps {}

const Explore = (props: ExploreProps) => {
	const [categories, setCategories] = useState<TCATEGORY_RES[]>([]);
	const [recommendList, setRecommendList] = useState<VIEWALL_LIST_TYPE | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: CATEGORY_LIST_RESPONSE | void = await getExploreAxios();
				if (response) {
					setCategories(response.CATEGORY);
					if (response.RECOMMEND_LIST.length > 0) {
						setRecommendList(response.RECOMMEND_LIST[0]); // 첫 번째 추천 리스트 사용
					}
				}
			} catch (error) {
				console.error("키워드를 불러오는 데 실패했습니다.", error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{categories.map((category, index) => (
				<KeywordList key={index} categoryList={category} />
			))}
			{recommendList && (
				<SingleList recommendList={recommendList} showTitle={true} />
			)}
		</>
	);
};

export default Explore;
