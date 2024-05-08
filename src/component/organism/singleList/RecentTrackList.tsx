// 단일 컨텐츠 리스트

import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
import RecentTrackListItem from "@/component/molecule/singleItem/RecentTrackListItem";
import { PLAYLIST_TRACK_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";

interface RecentTrackListProps {
	// recommendList: TITEM_INFO[];
	recommendList: TRACK_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function RecentTrackList({
	recommendList, showTitle, noScroll
}: RecentTrackListProps) {
	const { setSubTitle } = useContext(SubTitleContext);

	//console.log("props--> ", recentList, "props ");
	const tracks = recommendList.tracks;
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ItemListTitle.ViewAll
				isPresent={true}
				text='최근 재생 트랙 리스트'
				count={recommendList.totalCount}
				href={`/detail/recentTrackList?totalcnt=${recommendList.totalCount}`}
				onClick={() => {
					setSubTitle('최근 재생 트랙 리스트');
				}}
			/>
			<ul className={style.singleList}>
				{tracks.map((item: PLAYLIST_TRACK_ITEM_TYPE, index) => (
					<li key={item.id}>
						<RecentTrackListItem trackListInfo={item} position={index+1}  />
					</li>
				))}
			</ul>
		</div>
	);
}
