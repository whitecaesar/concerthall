"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import {ALBUM_RECENT_ITEM_TYPE} from "@/services/contents/RecentAlbumAxios";

interface AlbumItemProps {
	albumInfo: ALBUM_RECENT_ITEM_TYPE;
	trackCnt?: number;
	onClick?: () => void;
}

const RecentAlbumItem = ({ albumInfo, trackCnt, onClick }: AlbumItemProps) => {
	return (
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/album/track/${albumInfo.clientKey}?title=${encodeURIComponent(albumInfo.title)}`}>
				<Image
					src={albumInfo.thumbnail || "/images/hifiRoseLarge.png"}
					alt={albumInfo.title}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{albumInfo.title}</p>
				
			</Link>
			<div className={style.bottomInfo}>
				<p className={style.artist}>
					<p className={style.artistName}>{trackCnt? trackCnt : 0} Tracks</p>
				</p>
			</div>
		</div>
	);
};

export default RecentAlbumItem;
