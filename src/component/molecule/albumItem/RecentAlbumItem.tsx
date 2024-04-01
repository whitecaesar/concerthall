"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import Icon from "@/component/atom/icon/Icon";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import {ALBUM_RECENT_ITEM_TYPE} from "@/services/contents/RecentAlbumAxios";

interface AlbumItemProps {
	albumInfo: ALBUM_RECENT_ITEM_TYPE;
	onClick?: () => void;
}

const RecentAlbumItem = ({ albumInfo, onClick }: AlbumItemProps) => {
	return (
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/album/track/${albumInfo.id}`}>
				<Image
					src={albumInfo.thumbnail}
					alt={albumInfo.title}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{albumInfo.title}</p>
				<div className={style.bottomInfo}>
					<span className={style.thumbupCnt}>
						<Icon iconName="thumbUp" /> {albumInfo.star}
					</span>
					<span className={style.bar}></span>
					<span>12곡</span>
				</div>
			</Link>
		</div>
	);
};

export default RecentAlbumItem;
