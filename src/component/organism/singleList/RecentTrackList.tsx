// 단일 컨텐츠 리스트

import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
import RecentTrackListItem from "@/component/molecule/singleItem/RecentTrackListItem";
import { TRACK_TRACKS_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";

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
				{tracks.map((item: TRACK_RECENT_ITEM_TYPE, index:number) => (
					<li key={item.id}>
						<RecentTrackListItem trackListInfo={recommendList} trackInfo={item} position={index}  />
					</li>
				))}
			</ul>
		</div>
	);
}
