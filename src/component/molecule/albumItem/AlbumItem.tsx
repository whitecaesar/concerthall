"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import Icon from "@/component/atom/icon/Icon";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";

interface AlbumItemProps {
	albumInfo: ITEM_INFO_TYPE;
	onClick?: () => void;
}

const AlbumItem = ({ albumInfo, onClick }: AlbumItemProps) => {
	return (
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/${albumInfo.ID}`}>
				<Image
					src={albumInfo.THUMBNAIL}
					alt={albumInfo.TITLE}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{albumInfo.TITLE}</p>
				<div className={style.bottomInfo}>
					<span className={style.thumbupCnt}>
						<Icon iconName="thumbUp" /> {albumInfo.NUM_THUMBUP}
					</span>
					<span className={style.bar}></span>
					<span>{albumInfo.TOTAL_NUM_TRACK}곡</span>
				</div>
			</Link>
		</div>
	);
};

export default AlbumItem;
