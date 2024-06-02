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
import { ARTIST_LIST_ARTISTDTOS_TYPE, ARTIST_LIST_RESPONSE_TYPE } from "@/services/contents/LikeArtistAxios";

interface ArtistListViewAllProps {
	viewAllList: ARTIST_LIST_RESPONSE_TYPE;
}

export default function ArtistListViewAll({
	viewAllList: { artistDtos },
}: ArtistListViewAllProps) {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.artistListContainer}>
			<ul className={`${style.artistList} ${style.noScroll}`}>
				{artistDtos.map((item: ARTIST_LIST_ARTISTDTOS_TYPE) => (
					<li key={item.id}>
						<ArtistItem
							artistInfo={item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
