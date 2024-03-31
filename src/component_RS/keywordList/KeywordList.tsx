// KeywordList.tsx
"use client";

import React, { useContext, useState } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { TCATEGORY_RES, TKEYWORD_INFO } from "@/services/explore/ExploreAxios";
import style from "./kewordList.module.css";
interface CategoryProps {
	categoryList: TCATEGORY_RES;
}

const KeywordList = ({ categoryList: { TITLE, KEWORD } }: CategoryProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.keywordListWrap}>
			{/* <ItemListTitle.ViewAll
				isPresent={false}
				text={TITLE}
				href={`/detail/${TITLE}`}
			/> */}
			<ul className={style.keywordList}>
				{KEWORD.map((keyword: TKEYWORD_INFO) => (
					<li key={keyword.KEY}>
						<button
							className={style.keyword}
							onClick={() => {
								setSubTitle(keyword.NAME);
								//router.push(`/RS/explore/result?keyword=${keyword.NAME}`);
							}}
						>
							{keyword.NAME}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default KeywordList;
