"use client";
import RecentPlayListItem from "@/component/molecule/albumItem/RecentPlayListItem";
import style from "./albumList.module.css";
import {PLAY_RECENT_LIST_TYPE, PLAY_RECENT_LIST_RESPONSE} from "@/services/contents/RecentPlayListAxios";

interface RecentPlayListViewAllProps {
	playListViewAllList: PLAY_RECENT_LIST_RESPONSE;
}

export default function RecentPlayListViewAll({
	playListViewAllList: { totalCount, recentList },
}: RecentPlayListViewAllProps) {
	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{recentList.map((item: PLAY_RECENT_LIST_TYPE) => (
					<li key={item.playlist.id}>
						<RecentPlayListItem
							playListInfo={item.playlist}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}