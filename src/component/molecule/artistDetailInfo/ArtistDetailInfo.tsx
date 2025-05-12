// DetailInfo.tsx 앨범 클릭 > 트랙 페이지 상세
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./artistDetailInfo.module.css";
import { ARTISTINFO_INFO_TYPE } from "@/services/contents/ArtistInfoAxios";
import ArtistLikeButton from "@/component/atom/button/ArtistLikeButton";
import { ARTIST_GET_STAR_REQUEST_TYPE, ARTIST_REG_REQUEST_TYPE, getArtistStarAxios, getRegArtistInfoAxios } from "@/services/contents/LikeArtistAxios";

interface ArtistDetailInfoProps {
	detailInfo: ARTISTINFO_INFO_TYPE;
}

const ArtistDetailInfo = ({ detailInfo }: ArtistDetailInfoProps) => {
	const isLongTitle = (detailInfo?.NM_ARTIST ?? "").length > 20;
	const [star, setStarNumber] = useState(0);
	const [isFetch, setIsFetch] = useState<boolean>(false);

	useEffect(() => {
		console.log("ArtistDetailInfo", detailInfo);
		fetchStarRatings();
	}, []);
	
	const fetchStarRatings = async () => {
		try {
			const starTrackParam: ARTIST_REG_REQUEST_TYPE = {
				artist: { type: 'CONCERT_HALL', clientKey: detailInfo.ID_ARTIST}
			  };
			const artistStarResponse = await getRegArtistInfoAxios(starTrackParam);
			if (artistStarResponse.id) {
				const params: ARTIST_GET_STAR_REQUEST_TYPE = {
					artist : {id:artistStarResponse.id}
				};
				const response = await getArtistStarAxios(params);
				setStarNumber(response.code === '200' ? (response.rating.star || 0) : 0);
			} else {
				setStarNumber(0);
			}
		} catch (error) {
			console.error('Error fetching star rating', error);
			setStarNumber(0);
		}
		setIsFetch(true);
	};

	return isFetch &&
		<div className={style.artistDetailInfo}>
			<Image
				src={detailInfo.IMG_ARTIST}
				alt={detailInfo.NM_ARTIST}
				width={720}
				height={720}
				priority
				className={style.detailThumbnail}
			/>
			<div className={style.bottomInfo}>
				<div
					className={`${style.titleContainer} ${
						isLongTitle ? style.longTitle : ""
					}`}
				>
					<div className={style.artistDetailInfo}>
						<p>{detailInfo.NM_ARTIST}</p>
						<div className={style.buttonGroup}>
							<ArtistLikeButton starPoint={star} artistInfo={detailInfo} />
						</div>
					</div>
				</div>
				{/*
				<div className={style.buttonGroup}>

					<RoundPlayButton AlbumItem={detailInfo} />
					<RoundShuffleButton AlbumItem={detailInfo} />
				</div>
				*/}
			</div>
		</div>
	
};

export default ArtistDetailInfo;
