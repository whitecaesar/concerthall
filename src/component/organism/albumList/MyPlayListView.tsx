// 싱글 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 컨텐츠들만 나열

import React, { useContext } from "react";
import RecentPlayListItem from "@/component/molecule/albumItem/RecentPlayListItem";
import style from "./albumList.module.css";
import {PLAY_RECENT_ITEM_TYPE} from "@/services/contents/RecentPlayListAxios";
import { MY_RECENT_LIST_RESPONSE } from "@/services/contents/MyPlayListAxios";

interface MyPlayListViewProps {
	myPlayListViewList: MY_RECENT_LIST_RESPONSE;
}

export default function MyPlayListView({myPlayListViewList}: MyPlayListViewProps) {
	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{myPlayListViewList.playlists.map((item: PLAY_RECENT_ITEM_TYPE) => (
					<li key={item.id}>
						<RecentPlayListItem
							playListInfo={item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}


