"use client";
import React from "react";
import TrackItem from "@/component/molecule/trackItem/TrackItem";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";

interface TrackListProps {
	trackList: ALBUM_DETAIL_TYPE;
}

const TrackList = ({ trackList }: TrackListProps) => {
	// 여기서는 첫 번째 앨범의 트랙 정보만 사용합니다.
	const AlbumTracks = trackList?.ITEM_INFO;
	return (
		<div className="trackListWrap">
			<div className="trackNum">
				<span>{AlbumTracks.length} Tracks</span>
			</div>
			<ul className="trackList">
				{AlbumTracks.map((itemInfo, index) => (
					<li key={itemInfo.ID}>
						<TrackItem trackInfo={itemInfo} />
					</li>
				))}
			</ul>
			<style jsx>{`
				.trackListWrap {
					margin-top: 10px;
					.trackNum {
						padding: 10px 15px;
						font-size: 13px;
					}
					.trackList {
						list-style: none;
						padding: 0;
						li {
							margin: 5px 0;
						}
					}
				}
			`}</style>
		</div>
	);
};

export default TrackList;
