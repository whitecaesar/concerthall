// 단일 컨텐츠 리스트

import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "../albumList/albumList.module.css";
import {PLAY_RECENT_LIST_TYPE, PLAY_RECENT_LIST_RESPONSE} from "@/services/contents/RecentPlayListAxios";
import RecentPlayListItem from "@/component/molecule/albumItem/RecentPlayListItem";

interface RecentPlayListProps {
	// recommendList: TITEM_INFO[];
	recommendList: PLAY_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

const RecentPlayList = ({
	recommendList: { totalCount, recentList },
	showTitle,
	noScroll = false,
}: RecentPlayListProps) => {
	const { setSubTitle } = useContext(SubTitleContext);

	//console.log("props--> ", recentList, "props ");
	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{recentList && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text='최근 재생 플레이 리스트'
					count={totalCount}
					href={`/detail/recentPlayList?totalcount=${totalCount}`}
					onClick={() => {
						setSubTitle('최근 재생 플레이 리스트');
					}}
				/>
			)}
			<ul className={style.albumList}>
				
				{recentList.map((item: PLAY_RECENT_LIST_TYPE) => (
					<li key={item.playlist.id}>
						<RecentPlayListItem
							playListInfo={item.playlist}
							/*
							onClick={() => {
								setSubTitle(item.album.title);
								router.push(`/detail/album/track/${item.album.id}`);
							}}
							*/
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentPlayList;