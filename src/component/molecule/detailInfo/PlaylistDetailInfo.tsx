// DetailInfo.tsx 앨범 클릭 > 트랙 페이지 상세
"use client";
import React from "react";
import Image from "next/image";
import style from "./detailInfo.module.css";
import { TRACK_PLAYLIST_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import PlayListAllButton from "@/component/atom/button/PlayListAllButton";
import PlayListShuffleButton from "@/component/atom/button/PlayListSuffleButton";

interface PlayListDetailInfoProps {
	detailInfo: TRACK_PLAYLIST_ITEM_TYPE;
}

const playlistDetailInfo = ({ detailInfo }: PlayListDetailInfoProps) => {
	const isLongTitle = detailInfo.title.length > 20;
	return (
		<div className={style.albumDetailInfo}>
			<Image
				src={detailInfo.thumbnail}
				alt={detailInfo.title}
				width={720}
				height={611}
				priority
				className={style.detailThumbnail}
			/>
			<div className={style.bottomInfo}>
				<div
					className={`${style.titleContainer} ${
						isLongTitle ? style.longTitle : ""
					}`}
				>
					<p>{detailInfo.title}</p>
				</div>
				<div className={style.buttonGroup}>
					<PlayListAllButton ListItem={detailInfo}/>
					<PlayListShuffleButton TrackItem={detailInfo}/>
				</div>
			</div>
		</div>
	);
};

export default playlistDetailInfo;
