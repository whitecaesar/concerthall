// 아티스트 아이템(동그란 것)
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./artistItem.module.css";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";

interface ArtistItemProps {
	albumInfo: ITEM_INFO_TYPE;
	onClick?: () => void;
}

const ArtistItem = ({ albumInfo, onClick }: ArtistItemProps) => {
	return (
		<div className={style.artistItem} onClick={onClick}>
			<Link href={`/detail/album/track/${albumInfo.ID}`}>
				<Image
					src={albumInfo.THUMBNAIL}
					alt={albumInfo.TITLE}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{albumInfo.TITLE}</p>
			</Link>
		</div>
	);
};

export default ArtistItem;
