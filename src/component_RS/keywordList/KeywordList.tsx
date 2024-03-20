// KeywordList.tsx
"use client";

import React, { useContext, useState } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./keywordList.module.css";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { TCATEGORY_RES, TKEYWORD_INFO } from "@/services/explore/ExploreAxios";

interface CategoryProps {
	categoryList: TCATEGORY_RES;
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
						<button
							className="keyword"
							onClick={() => {
								setSubTitle(keyword.NAME);
								router.push(`/explore/result?keyword=${keyword.NAME}`);
							}}
						>
							{keyword.NAME}
						</button>
						<style jsx>{`
							.keyword {
								text-align: center;
								background: #000;
								border: 1px solid var(--borderDark);
								border-radius: 30px;
								color: #fff;
								min-width: 50px;
								height: 35px;
								padding: 0 15px;
								white-space: nowrap;
							}
							.keyword:active,
							.keyword:hover {
								background: var(--mainColor);
								transition: all 0.25s;
							}
						`}</style>
					</li>
				))}
			</ul>
		</div>
	);
};

export default KeywordList;
