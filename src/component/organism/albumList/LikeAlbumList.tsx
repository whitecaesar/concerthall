// 앨범 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 앨범들만 나열

"use client";
import React, { useContext } from "react";
import style from "./albumList.module.css";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import {ALBUM_RECENT_ITEM_TYPE} from "@/services/contents/RecentAlbumAxios";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";
import { ALBUM_LIKE_LIST_RESPONSE } from "@/services/contents/LikeAlbumListAxios";


interface LikeAlbumListProps {
	likeAlbumList: ALBUM_LIKE_LIST_RESPONSE;
}

export default function LikeAlbumList({likeAlbumList}: LikeAlbumListProps) {
	const { setSubTitle } = useContext(SubTitleContext);
	
	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{likeAlbumList && likeAlbumList.albums.map((item: ALBUM_RECENT_ITEM_TYPE) => (
					<li key={item.id}>
						<RecentAlbumItem
							albumInfo={item}
							onClick={() => {
								setSubTitle(item.title);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
