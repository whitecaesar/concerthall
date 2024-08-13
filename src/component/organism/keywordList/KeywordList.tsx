"use client";
import React, { useContext } from "react";
import Keyword from "@/component/atom/keyword/Keyword";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./keywordList.module.css";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { TCATEGORY_RES, TKEYWORD_INFO } from "@/services/explore/ExploreAxios";

interface CategoryProps {
	categoryList: TCATEGORY_RES;
	onClick?: () => void;
}

const KeywordList = ({ categoryList: { TITLE, KEWORD } }: CategoryProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);
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
								setSubTitle(keyword.NAME);
								router.push(`/explore/result?key=${keyword.KEY}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default KeywordList;
