"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import {ALBUM_RECENT_ITEM_TYPE} from "@/services/contents/RecentAlbumAxios";
import AlbumLikeButton from "@/component/atom/button/AlbumLikeButton";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";

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
			</Link>
		</div>
	);
};

export default RecentAlbumItem;
