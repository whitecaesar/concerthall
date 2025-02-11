// 단일 컨텐츠 리스트

import React from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./singleList.module.css";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
import RecentTrackListItem from "@/component/molecule/singleItem/RecentTrackListItem";

interface RecentTrackListProps {
	// recommendList: TITEM_INFO[];
	recommendList: TRACK_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
	title: string;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function RecentTrackList({
	recommendList, showTitle, noScroll, title
}: RecentTrackListProps) {
	const tracks = recommendList.tracks;
	console.log(title);
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ItemListTitle.ViewAll
				isPresent={true}
				text={title}
				count={recommendList.totalCount}
				href={`/detail/recentTrackList?totalcnt=${recommendList.totalCount}&title=${title}`}
			/>
			<ul className={style.singleList}>
				{tracks.map((item: TRACK_RECENT_ITEM_TYPE, index:number) => (
					<li key={item.id}>
						<RecentTrackListItem trackListInfo={recommendList} trackInfo={item} position={index}  />
					</li>
				))}
			</ul>
		</div>
	);
}
