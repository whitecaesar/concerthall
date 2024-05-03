// 단일 컨텐츠 리스트

import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
import RecentTrackListItem from "@/component/molecule/singleItem/RecentTrackListItem";

interface RecentTrackListProps {
	// recommendList: TITEM_INFO[];
	recommendList: TRACK_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function RecentTrackList({
	recommendList: { totalCount, tracks },
}: RecentTrackListProps) {
	const { setSubTitle } = useContext(SubTitleContext);

	//console.log("props--> ", recentList, "props ");
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ItemListTitle.ViewAll
				isPresent={false}
				text='최근 재생 트랙 리스트'
				count={20}
				href={`/detail/recentPlayList?totalcount=${totalCount}`}
				onClick={() => {
					setSubTitle('최근 재생 트랙 리스트');
				}}
			/>
			<ul className={style.singleList}>
				{tracks.map((item: TRACK_RECENT_ITEM_TYPE) => (
					<li key={item.id}>
						<RecentTrackListItem trackListInfo={item} />
					</li>
				))}
			</ul>
		</div>
	);
}
