// DetailInfo.tsx 앨범 클릭 > 트랙 페이지 상세
"use client";
import React from "react";
import Image from "next/image";
import RoundPlayButton from "@/component/atom/button/RoundPlayButton";
import RoundShuffleButton from "@/component/atom/button/RoundSuffleButton";
import style from "./artistDetailInfo.module.css";
import { ARTISTINFO_INFO_TYPE } from "@/services/contents/ArtistInfoAxios";
import AlbumLikeButton from "@/component/atom/button/AlbumLikeButton";
import ArtistLikeButton from "@/component/atom/button/ArtistLikeButton";

interface ArtistDetailInfoProps {
	detailInfo: ARTISTINFO_INFO_TYPE;
}

const ArtistDetailInfo = ({ detailInfo }: ArtistDetailInfoProps) => {
	const isLongTitle = detailInfo.NM_ARTIST?.length > 20;

	return (
		<div className={style.artistDetailInfo}>
			<Image
				src={detailInfo.IMG_ARTIST}
				alt={detailInfo.NM_ARTIST}
				width={720}
				height={720}
				priority
				className={style.detailThumbnail}
			/>
			<div className={style.bottomInfo}>
				<div
					className={`${style.titleContainer} ${
						isLongTitle ? style.longTitle : ""
					}`}
				>
					<p>{detailInfo.NM_ARTIST}<ArtistLikeButton starPoint={1} artistInfo={detailInfo}/></p>
				</div>
				{/*
				<div className={style.buttonGroup}>

					<RoundPlayButton AlbumItem={detailInfo} />
					<RoundShuffleButton AlbumItem={detailInfo} />
				</div>
				*/}
			</div>
		</div>
	);
};

export default ArtistDetailInfo;
