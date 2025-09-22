// 앨범 리스트들

"use client";
import { useState, useEffect } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./albumList.module.css";
import {ALBUM_RECENT_LIST_TYPE, ALBUM_RECENT_LIST_RESPONSE} from "@/services/contents/RecentAlbumAxios";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";
import { getAlbumTrackCnt, ALBUM_TRACK_CNT_RESPONSE_TYPE } from "@/services/contents/AlbumAxios";

interface RecentAlbumListProps {
	recommendList: ALBUM_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
	title: string;
}

const RecentAlbumList = ({
	recommendList: { totalCount, recentList },
	showTitle,
	noScroll = false,
	title,
}: RecentAlbumListProps) => {
	console.log("recentList", recentList);
	const [trackCntResult, setTrackCntResult] = useState<ALBUM_TRACK_CNT_RESPONSE_TYPE | null>(null);

	useEffect(() => {
		const fetchAlbumTrackCnt = async () => {
			try {
				// recentList에서 album.id만 추출
				const albumIds = recentList.map(item => item.album.clientKey);
				
				// getAlbumTrackCnt 함수에 전달할 파라미터 생성
				const param = {
					albums: albumIds.map(id => ({ albumId: id }))
				};
				
				// getAlbumTrackCnt 함수 호출
				const result = await getAlbumTrackCnt(param);
				setTrackCntResult(result);
				console.log("앨범 트랙 카운트 결과:", result);
			} catch (error) {
				console.error("앨범 트랙 카운트 조회 실패:", error);
			}
		};
		
		if (recentList && recentList.length > 0) {
			fetchAlbumTrackCnt();
		}
	}, [recentList]);

	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && recentList && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={title}
					count={totalCount}
					href={`/detail/recentAlbum?totalcount=${totalCount}&title=${title}`}
				/>
			)}
			<ul className={style.albumList}>
				
				{recentList.map((item: ALBUM_RECENT_LIST_TYPE) => (
					<li key={item.album.id}>
						<RecentAlbumItem
							albumInfo={item.album}
							trackCnt={trackCntResult?.albums.find(album => album.album_id === item.album.clientKey)?.track_cnt}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentAlbumList;
