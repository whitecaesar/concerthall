// 아티스트 아이템(동그란 것)
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./artistItem.module.css";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import { ARTIST_LIST_ARTISTDTOS_TYPE } from "@/services/contents/LikeArtistAxios";
import { getArtistInfoAxios } from "@/services/contents/ArtistInfoAxios";

interface ArtistItemProps {
	artistInfo: ARTIST_LIST_ARTISTDTOS_TYPE;
	onClick?: () => void;
}

const ArtistItem = ({ artistInfo, onClick }: ArtistItemProps) => {
	const [thumbnail, setThumbnail] = useState(artistInfo.thumbnail?artistInfo.thumbnail[0]:'');

	useEffect(() => {
		// const recent = ;
		if(!artistInfo.thumbnail)
		{
			fetchArtistList();
		}
	}, [artistInfo]);


	const fetchArtistList = async () => {
		try {
			const ArtistInfo = getArtistInfoAxios(artistInfo.clientKey);
			setThumbnail((await ArtistInfo).ARTIST_INFO.IMG_ARTIST);
		} catch (error) {
			console.error('Error fetching star rating', error);
			return;
		}
	};

	return (
		<div className={style.artistItem} onClick={onClick}>
			<Link href={`/artist/${artistInfo.clientKey}`}>
				{thumbnail &&
				<Image
					src={thumbnail}
					alt={artistInfo.name}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				}
				<p className={style.title}>{artistInfo.name}</p>
			</Link>
		</div>
	);
};

export default ArtistItem;
