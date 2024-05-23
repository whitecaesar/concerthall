"use client";
import React, { useEffect, useState } from "react";
import PLTrackItem from "@/component/molecule/trackItem/PLTrackItem";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";

interface RCTTrackListProps {
	trackList: TRACK_RECENT_LIST_RESPONSE;
}

const RCTTrackList = ({ trackList }: RCTTrackListProps) => {
	// 여기서는 첫 번째 앨범의 트랙 정보만 사용합니다.
    const [tracks, setTracks] = useState<TRACK_RECENT_ITEM_TYPE[]>([]);

    useEffect(() => {
        if (trackList) {
            setTracks(trackList.tracks); // 데이터가 준비된 후 상태 업데이트
        }
    }, [trackList]); // trackList가 변경될 때마다 실행

	return (
		<div className="trackListWrap">
			<ul className="trackList">
				{tracks.map((item: TRACK_RECENT_ITEM_TYPE, index:number) => (
					<li key={item.id}>
						<PLTrackItem trackInfo={item} trackListInfo={trackList} position={index} method="track"/>
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

export default RCTTrackList;
