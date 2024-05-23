// 싱글 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 컨텐츠들만 나열

import React, { useContext } from "react";
import RecentPlayListItem from "@/component/molecule/albumItem/RecentPlayListItem";
import style from "./albumList.module.css";
import {PLAY_RECENT_LIST_TYPE, PLAY_RECENT_LIST_RESPONSE} from "@/services/contents/RecentPlayListAxios";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";
import router from "next/router";

interface RecentPlayListViewAllProps {
	playListViewAllList: PLAY_RECENT_LIST_RESPONSE;
}

export default function RecentPlayListViewAll({
	playListViewAllList: { recentList },
}: RecentPlayListViewAllProps) {
	const { setSubTitle } = useContext(SubTitleContext);
	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{recentList.map((item: PLAY_RECENT_LIST_TYPE) => (
					<li key={item.playlist.id}>
						<RecentPlayListItem
							playListInfo={item.playlist}
							onClick={() => {
								setSubTitle(item.playlist.title);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}


