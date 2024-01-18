"use client";
import React, { useContext } from "react";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import { TVIEWALL_LIST_RES } from "@/services/contents/ViewAllAxios";
import style from "./albumList.module.css";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { TITEM_INFO } from "@/types/itemInfo";

interface AlbumListViewAllProps {
	viewAllList: TVIEWALL_LIST_RES;
}

export default function AlbumListViewAll({
	viewAllList: { TYPE = "ALBUM", ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
}: AlbumListViewAllProps) {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{ITEM_INFO.map((item: TITEM_INFO) => (
					<li key={item.ID}>
						<AlbumItem
							albumInfo={item}
							onClick={() => {
								setSubTitle(item.TITLE);
								router.push(`/detail/${item.ID}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
