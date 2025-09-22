// 앨범 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 앨범들만 나열

"use client";
import style from "./albumList.module.css";
import {ALBUM_RECENT_ITEM_TYPE} from "@/services/contents/RecentAlbumAxios";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";
import { ALBUM_LIKE_LIST_RESPONSE } from "@/services/contents/LikeAlbumListAxios";
import { ALBUM_TRACK_CNT_RESPONSE_TYPE, getAlbumTrackCnt } from "@/services/contents/AlbumAxios";
import { useEffect, useState } from "react";


interface LikeAlbumListProps {
	likeAlbumList: ALBUM_LIKE_LIST_RESPONSE;
}

export default function LikeAlbumList({likeAlbumList}: LikeAlbumListProps) {

	const [trackCntResult, setTrackCntResult] = useState<ALBUM_TRACK_CNT_RESPONSE_TYPE | null>(null);
	
	useEffect(() => {
		const fetchAlbumTrackCnt = async () => {
			try {
				// recentList에서 album.id만 추출
				const albumIds = likeAlbumList.albums.map(item => item.clientKey);
				
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
		
		if (likeAlbumList && likeAlbumList.albums.length > 0) {
			fetchAlbumTrackCnt();
		}
	}, [likeAlbumList]);

	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{likeAlbumList && likeAlbumList.albums.map((item: ALBUM_RECENT_ITEM_TYPE) => (
					<li key={item.id}>
						<RecentAlbumItem
							albumInfo={item}
							trackCnt={trackCntResult?.albums.find(album => album.album_id === item.clientKey)?.track_cnt}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
