import React from "react";
import TrackItem from "./TrackItem";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/TrackAxios";
import style from "./albumList.module.css";

interface TrackListProps {
	trackList: ALBUM_DETAIL_TYPE[];
}

const TrackList = ({ trackList }: TrackListProps) => {
	// 여기서는 첫 번째 앨범의 트랙 정보만 사용합니다.
	const firstAlbumTracks = trackList[0]?.ITEM_INFO || [];

	return (
		<div className={style.trackListWrap}>
			<div className={style.trackNum}>
				<span>{firstAlbumTracks.length} Tracks</span>
			</div>
			<ul className={style.trackList}>
				{firstAlbumTracks.map((itemInfo, index) => (
					<li key={`${trackList[0].ID}-${index}`}>
						<TrackItem trackInfo={itemInfo} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default TrackList;
