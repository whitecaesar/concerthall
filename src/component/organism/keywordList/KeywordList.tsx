"use client";
import React, { useContext } from "react";
import Keyword from "@/component/atom/keyword/Keyword";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./keywordList.module.css";
import { useRouter } from "next/navigation";
import { TCATEGORY_RES, TKEYWORD_INFO } from "@/services/explore/ExploreAxios";

interface CategoryProps {
	categoryList: TCATEGORY_RES;
	onClick?: () => void;
}

const KeywordList = ({ categoryList: { TITLE, KEWORD } }: CategoryProps) => {
	const router = useRouter();
	return (
		<div className={style.keywordListWrap}>
			<ItemListTitle.ViewAll
				isPresent={false}
				text={TITLE}
				href={`/detail/${TITLE}`}
			/>
			<ul className={style.keywordList}>
				{KEWORD.map((keyword: TKEYWORD_INFO) => (
					<li key={keyword.KEY}>
						<Keyword
							keywordInfo={keyword}
							onClick={() => {
								// 키워드 값 디버깅 로그
								console.log('원본 키워드:', keyword.KEY, 'NAME:', keyword.NAME);
								
								// 키워드에 표시되는 NAME 값을 사용하여 검색 (실제 보여지는 텍스트 사용)
								const searchValue = keyword.NAME || keyword.KEY;
								console.log('검색에 사용될 값:', searchValue);
								
								router.push(`/explore/result?search=${encodeURIComponent(searchValue)}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default KeywordList;
