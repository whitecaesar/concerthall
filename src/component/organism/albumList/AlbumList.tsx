// 앨범 리스트들

"use client";
import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./albumList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface AlbumListProps {
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
}

const AlbumList = ({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	showTitle,
	noScroll = false,
}: AlbumListProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	//console.log("props--> ", ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO, "props ");
	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && TITLE && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
					href={`/detail/album/${ID}`}
					onClick={() => {
						setSubTitle(TITLE);
					}}
				/>
			)}
			<ul className={style.albumList}>
				
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<AlbumItem
							albumInfo={item}
							onClick={() => {
								setSubTitle(item.TITLE);
								//router.push(`/detail/album/track/${item.ID}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
