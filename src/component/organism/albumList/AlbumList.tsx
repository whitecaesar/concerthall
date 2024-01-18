"use client";
import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import { TRECOMMEND_LIST_RES } from "@/services/banner/MainInfoAxios";
import style from "./albumList.module.css";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { TITEM_INFO } from "@/types/itemInfo";

interface AlbumListProps {
	recommendList: TRECOMMEND_LIST_RES;
	showTitle: boolean;
	noScroll?: boolean;
}

export default function AlbumList({
	recommendList: { TYPE = "ALBUM", ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	showTitle,
	noScroll = false,
}: AlbumListProps) {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	const listType = noScroll
		? `${style.albumList} ${style.noScroll}`
		: style.albumList;

	return (
		<div className={style.albumListContainer}>
			{showTitle && TITLE && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
				/>
			)}
			<ul className={listType}>
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
