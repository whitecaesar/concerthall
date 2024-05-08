"use client";
import React from "react";
import { PLAYLIST_TRACK_ITEM_TYPE} from "@/services/contents/PlayListTrackAxios";
import PLTrackItem from "@/component/molecule/trackItem/PLTrackItem";

interface RCTTrackListProps {
	trackList: PLAYLIST_TRACK_ITEM_TYPE[];
}

const RCTTrackList = ({ trackList }: RCTTrackListProps) => {
	// 여기서는 첫 번째 앨범의 트랙 정보만 사용합니다.

	return (
		<div className="trackListWrap">
			<ul className="trackList">
				{trackList.map((itemInfo, index) => (
					<li key={itemInfo.id}>
						<PLTrackItem trackInfo={itemInfo} position={index+1} />
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
