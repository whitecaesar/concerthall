// FuncButtonGroup.tsx
"use client";
import React, { useEffect, useState } from "react";
import LikeButton from "@/component/atom/button/LikeButton";
import Button from "@/component/atom/button/Button";
import FuncButton from "@/component/atom/button/FuncButton";
import {
	ALBUM_DETAIL_TYPE,
	ALBUM_ITEM_TYPE,
} from "@/services/contents/AlbumAxios";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { funcAlbumPlayClick } from "@/services/common";
import ThumbupButton from "@/component/atom/button/ThumbupButton";
import AlbumLikeButton from "@/component/atom/button/AlbumLikeButton";
import { STAR_ALBUM_REQUEST_TYPE, STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, getStarAlbumAxios, getStarAxios } from "@/services/contents/StarAxios";

interface ShareInfoProps {
	AlbumItem: ALBUM_DETAIL_TYPE;
	pageType?: string; // 페이지 타입 prop 추가
}
const FuncButtonGroup = ({ AlbumItem, pageType }: ShareInfoProps) => {
	const track = AlbumItem.ITME_INFO;
	const [star, setStarNumber] = useState(0);
	const [isFetch, setIsFetch] = useState<boolean>(false);

	function addPropertyToItemInfo(
		id: string,
		propertyName: string,
		propertyValue: string
	) {
		const item = AlbumItem.ITME_INFO.find((item) => item.ID === id);
		if (item) {
			// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

	const handleClick = async (trackItem: ALBUM_ITEM_TYPE[]) => {
		trackItem.forEach(async (item: ALBUM_ITEM_TYPE) => {
			try {
				const playInfo = getPlayInfoAxios(item.ID);
				addPropertyToItemInfo(
					item.ID,
					"PLAYABLE_CODE",
					(await playInfo).RES_CODE
				);
				addPropertyToItemInfo(item.ID, "URL", (await playInfo).INFO.URL);
			} catch (error) {
				console.error("Error fetching data for item", item.ID, error);
			}
		});

		AlbumItem.ITME_INFO = trackItem;
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
				onClick={() => handleClick(track)}
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
