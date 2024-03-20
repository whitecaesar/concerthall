// TrackList.tsx

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./trackItem.module.css";
import {
	ALBUM_DETAIL_TYPE,
	TRACK_ITEM_TYPE,
} from "@/services/contents/TrackAxios";

interface TrackListProps {
	trackList: ALBUM_DETAIL_TYPE[];
}

const TrackList = ({ trackList }: TrackListProps) => {
	// 여기서는 첫 번째 앨범의 트랙 정보만 사용합니다.
	const firstAlbumTracks = trackList[0]?.ITEM_INFO || [];

	return (
		<div className="trackListWrap">
			<div className="trackNum">
				<span>{firstAlbumTracks.length} Tracks</span>
			</div>
			<ul className="trackList">
				{firstAlbumTracks.map((trackInfo: TRACK_ITEM_TYPE, index) => (
					<li key={`${trackList[0].ID}-${index}`}>
						<div className={style.trackItem}>
							<Link href={`/album/track/${trackInfo.ID}`}>
								<div>
									<Image
										src={trackInfo.THUMBNAIL}
										alt={trackInfo.TITLE}
										width={30}
										height={30}
										priority={true}
										className={style.thumbnail}
									/>
									<p className={style.title}>{trackInfo.TITLE}</p>
									<p className={style.artist}>{trackInfo.ARTIST}</p>
								</div>
							</Link>
							<div className={style.buttonGroup}>
								<LikeButton />
								<FuncButton funcClick={() => {}} />
							</div>
						</div>
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
