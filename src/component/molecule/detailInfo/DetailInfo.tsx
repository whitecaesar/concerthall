"use client";

import React from "react";
import Image from "next/image";
import RoundPlayButton from "@/component/atom/button/RoundPlayButton";
import RoundShuffleButton from "@/component/atom/button/RoundSuffleButton";
import { ItemInfoType } from "@/interface/itemInfoType";
import style from "./detailInfo.module.css";

export default function DetailInfo(props: { detailInfo: ItemInfoType }) {
	const { detailInfo } = props;
	const isLongTitle = detailInfo.title.length > 20;

	return (
		<div className={style.albumDetailInfo}>
			<Image
				src={detailInfo.albumDetailThumbnail}
				alt={detailInfo.title}
				width={720}
				height={611}
				priority={true}
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
					<RoundPlayButton />
					<RoundShuffleButton />
				</div>
			</div>
		</div>
	);
}
