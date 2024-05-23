"use client";
import React, { useEffect, useState } from "react";
import TrackItem from "@/component/molecule/trackItem/TrackItem";
import { TRACK_PLAYLIST_TYPE, TRACK_TRACKS_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import PLTrackItem from "@/component/molecule/trackItem/PLTrackItem";

interface PLTrackListProps {
	trackList: TRACK_PLAYLIST_TYPE;
}

const PLTrackList = ({ trackList }: PLTrackListProps) => {
	// 여기서는 첫 번째 앨범의 트랙 정보만 사용합니다.
	const [PLTracks, setPLTracks] = useState<TRACK_TRACKS_ITEM_TYPE[]>([]);

    useEffect(() => {
        if (trackList) {
            setPLTracks(trackList.tracks); // 데이터가 준비된 후 상태 업데이트
        }
    }, [trackList]); // trackList가 변경될 때마다 실행

	return (
		<div className="trackListWrap">
			<div className="trackNum">
				<span>{PLTracks.length} Tracks</span>
			</div>
			<ul className="trackList">
				{PLTracks.map((itemInfo:TRACK_TRACKS_ITEM_TYPE, index:number) => (
					<li key={itemInfo.id}>
						<PLTrackItem trackInfo={itemInfo} trackListInfo={trackList} position={index} method='playlist'/>
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

export default PLTrackList;
