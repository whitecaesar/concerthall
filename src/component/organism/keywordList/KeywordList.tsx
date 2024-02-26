"use client";
import React, { useContext } from "react";
import Keyword from "@/component/atom/keyword/Keyword";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./keywordList.module.css";
import keywordData from "@/data/keywordinfo.json";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { TCATEGORY_RES } from "@/services/explore/ExploreAxios";


interface CategoryProps {
	categoryList: TCATEGORY_RES;
	onClick?: () => void;
}

export default function KeywordList({ title = "GENRE", ID = 1 }) {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);
	return (
		<div className={style.keywordListWrap}>
			<ItemListTitle.ViewAll
				isPresent={false}
				text={title}
				href={`/detail/${ID}`}
			/>
			<ul className={style.keywordList}>
				{keywordData.KEYWORD.map((keyword) => (
					<li key={keyword.key}>
						<Keyword
							KeywordText={keyword.children}
							onClick={() => {
								setSubTitle(keyword.children);
								router.push(`/explore/result?keyword=${keyword.children}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
