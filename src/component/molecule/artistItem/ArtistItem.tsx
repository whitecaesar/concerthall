// 아티스트 아이템(동그란 것)
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./artistItem.module.css";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import { ARTIST_LIST_ARTISTDTOS_TYPE } from "@/services/contents/LikeArtistAxios";
import { getArtistInfoAxios } from "@/services/contents/ArtistInfoAxios";
import { API_URL_CIP } from "@/services/common";

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

	// 썸네일 URL 조건부 처리
	const getThumbnailUrl = (url: string) => {
		if (!url) return '';
		
		// "/CHC_IMG/OTT_IMG/ARTIST"가 포함되어 있는지 확인
		if (url.includes('/CHC_IMG/OTT_IMG/ARTIST')) {
			return url;
		} else {
			// 포함되지 않은 경우 기본 URL 추가
			return `${API_URL_CIP}/CHC_IMG/OTT_IMG/ARTIST${url}`;
		}
	};

	return (
		<div className={style.artistItem} onClick={onClick}>
			<Link href={`/artist/${artistInfo.clientKey}`}>
				{thumbnail &&
				<Image
					src={getThumbnailUrl(thumbnail)}
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
