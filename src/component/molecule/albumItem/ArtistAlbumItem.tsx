"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import { ARTIST_ALBUM_INFO_TYPE } from "@/services/contents/ArtistInfoAxios";

interface ArtistAlbumItemProps {
	artistInfo: ARTIST_ALBUM_INFO_TYPE;
	onClick?: () => void;
}

const ArtistAlbumItem = ({ artistInfo, onClick }: ArtistAlbumItemProps) => {
	return (
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/album/track/${artistInfo.ID}?title=${artistInfo.TITLE}`}>
				<Image
					src={artistInfo.THUMBNAIL}
					alt={artistInfo.TITLE}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{artistInfo.TITLE}</p>
				{/*<div className={style.bottomInfo}>
					<span className={style.thumbupCnt}>
						<Icon iconName="thumbUp" /> {albumInfo.NUM_THUMBUP}
					</span>
					<span className={style.bar}></span>
					<span>{albumInfo.TOTAL_NUM_TRACK}곡</span>
				</div>*/}
			</Link>
		</div>
	);
};

export default ArtistAlbumItem;
