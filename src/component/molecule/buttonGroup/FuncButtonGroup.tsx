// FuncButtonGroup.tsx
"use client";
import React, { useEffect, useState } from "react";
import Button from "@/component/atom/button/Button";
import FuncButton from "@/component/atom/button/FuncButton";
import {
	ALBUM_DETAIL_TYPE,
} from "@/services/contents/AlbumAxios";
import { funcAlbumPlayClick } from "@/services/common";
import ThumbupButton from "@/component/atom/button/ThumbupButton";
import AlbumLikeButton from "@/component/atom/button/AlbumLikeButton";
import { STAR_ALBUM_REQUEST_TYPE, STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, getStarAlbumAxios, getStarAxios } from "@/services/contents/StarAxios";

interface ShareInfoProps {
	AlbumItem: ALBUM_DETAIL_TYPE;
	pageType?: string; // 페이지 타입 prop 추가
}
const FuncButtonGroup = ({ AlbumItem, pageType }: ShareInfoProps) => {
	const [star, setStarNumber] = useState(0);
	const [isFetch, setIsFetch] = useState<boolean>(false);

	const handleClick = async () => {
		funcAlbumPlayClick("AlbumShare", AlbumItem);
	};

	useEffect(() => {
		fetchStarRatings();
	}, []);
	
	const fetchStarRatings = async () => {
		try {
			const starTrackParam: STAR_ALBUM_REQUEST_TYPE = {
				album: { type: 'CONCERT_HALL', clientKey: AlbumItem.ID }
			};
			// 앨범 등록 여부 확인
			const albumStarResponse = await getStarAlbumAxios(starTrackParam);
			if (albumStarResponse.id) {
				const contentParam: STAR_REQUEST_ITEM_TYPE[] = [{
				id: albumStarResponse.id,
				clientKey: AlbumItem.ID
				}];
				const params: STAR_REQUEST_TYPE = {
				contents: contentParam,
				mediaType: 'CONCERT_HALL'
				};
				const response = await getStarAxios('ALBUM', params);
				setStarNumber(response.code === '200' ? (response.contents[0].star || 0) : 0);
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
		<div className="FuncButtonGroup">
			{pageType === "PlayListPage" ? (
				<ThumbupButton status={false} targetId={AlbumItem.ID}/>
			) : (
				<AlbumLikeButton starPoint={star} album_info={AlbumItem}  />
			)}
			<Button
				type="button"
				icon="iconShare"
				onClick={() => handleClick()}
			/>
			<FuncButton method="albumMore" album_info={AlbumItem}/>
			{/* 기능 로직 넣으세요. */}
			<style jsx>{`
				.FuncButtonGroup {
					display: flex;
					justify-content: space-around;
					gap: 10px;
					padding: 15px;
					border-bottom: 1px solid var(--borderDark);
					i {
						width: 20px;
						height: 20px;
					}
				}
			`}</style>
		</div>
};

export default FuncButtonGroup;
