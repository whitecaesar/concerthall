// 단일 컨텐츠 리스트

import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

import {PLAY_RECENT_LIST_TYPE, PLAY_RECENT_LIST_RESPONSE} from "@/services/contents/RecentPlayListAxios";
import RecentPlayListItem from "@/component/molecule/singleItem/RecentPlayListItem";

interface RecentPlayListProps {
	// recommendList: TITEM_INFO[];
	recommendList: PLAY_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function RecentPlayList({
	recommendList: { totalCount, recentList },
}: RecentPlayListProps) {
	const { setSubTitle } = useContext(SubTitleContext);

	//console.log("props--> ", recentList, "props ");
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ItemListTitle.ViewAll
				isPresent={true}
				text='최근 플레이 리스트'
				count={totalCount}
				href={`/detail/recentPlayList?totalcount=${totalCount}`}
				onClick={() => {
					setSubTitle('최근 플레이 리스트');
				}}
			/>
			<ul className={style.singleList}>
				{recentList.map((item: PLAY_RECENT_LIST_TYPE) => (
					<li key={item.playlist.id}>
						<RecentPlayListItem playListInfo={item.playlist} />
					</li>
				))}
			</ul>
		</div>
	);
}
