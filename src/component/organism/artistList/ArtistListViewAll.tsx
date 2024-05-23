// 아티스트들 전부 보여주는 컴포넌트 (ex 즐겨찾기, Relatid Artist의 ViewAll)

"use client";
import React, { useContext } from "react";
import style from "./artistList.module.css";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import ArtistItem from "@/component/molecule/artistItem/ArtistItem";

interface ArtistListViewAllProps {
	viewAllList: VIEWALL_LIST_TYPE;
}

export default function ArtistListViewAll({
	viewAllList: { ITEM_INFO },
}: ArtistListViewAllProps) {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.artistListContainer}>
			<ul className={`${style.artistList} ${style.noScroll}`}>
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<ArtistItem
							albumInfo={item}
							onClick={() => {
								setSubTitle(item.TITLE);
								router.push(`/detail/album/track/${item.ID}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
