// DetailInfo.tsx 앨범 클릭 > 트랙 페이지 상세
"use client";
import React from "react";
import Image from "next/image";
import RoundPlayButton from "@/component/atom/button/RoundPlayButton";
import RoundShuffleButton from "@/component/atom/button/RoundSuffleButton";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";
import style from "./detailInfo.module.css";

interface DetailInfoProps {
	detailInfo: ALBUM_DETAIL_TYPE;
}

const DetailInfo = ({ detailInfo }: DetailInfoProps) => {
	const isLongTitle = detailInfo.TITLE.length > 20;

	return (
		<div className={style.albumDetailInfo}>
			<Image
				src={detailInfo.THUMBNAIL}
				alt={detailInfo.TITLE}
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
					<p>{detailInfo.TITLE}</p>
				</div>
				<div className={style.buttonGroup}>
					<RoundPlayButton />
					<RoundShuffleButton />
				</div>
			</div>
		</div>
	);
};

export default DetailInfo;
