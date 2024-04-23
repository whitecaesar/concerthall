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

import {ALBUM_RECENT_LIST_TYPE, ALBUM_RECENT_LIST_RESPONSE} from "@/services/contents/RecentAlbumAxios";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";

interface RecentAlbumListProps {
	recommendList: ALBUM_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
}

const RecentAlbumList = ({
	recommendList: { totalCount, recentList },
	showTitle,
	noScroll = false,
}: RecentAlbumListProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	//console.log("props--> ", recentList, "props ");
	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && recentList && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text='최근 재생 앨범'
					count={totalCount}
					href={`/detail/recentAlbum?totalcount=${totalCount}`}
					onClick={() => {
						setSubTitle('최근 재생 앨범');
					}}
				/>
			)}
			<ul className={style.albumList}>
				
				{recentList.map((item: ALBUM_RECENT_LIST_TYPE) => (
					<li key={item.album.id}>
						<RecentAlbumItem
							albumInfo={item.album}
							onClick={() => {
								setSubTitle(item.album.title);
								router.push(`/detail/album/track/${item.album.id}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentAlbumList;
