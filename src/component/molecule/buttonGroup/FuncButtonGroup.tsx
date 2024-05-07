// FuncButtonGroup.tsx
"use client";
import React from "react";
import LikeButton from "@/component/atom/button/LikeButton";
import Button from "@/component/atom/button/Button";
import FuncButton from "@/component/atom/button/FuncButton";
import {
	ALBUM_DETAIL_TYPE,
	TRACK_ITEM_TYPE,
} from "@/services/contents/AlbumAxios";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { funcAlbumPlayClick } from "@/services/common";
import ThumbupButton from "@/component/atom/button/ThumbupButton";

interface ShareInfoProps {
	AlbumItem: ALBUM_DETAIL_TYPE;
	pageType?: string; // 페이지 타입 prop 추가
}
const FuncButtonGroup = ({ AlbumItem, pageType }: ShareInfoProps) => {
	const track = AlbumItem.ITEM_INFO;

	function addPropertyToItemInfo(
		id: string,
		propertyName: string,
		propertyValue: string
	) {
		const item = AlbumItem.ITEM_INFO.find((item) => item.ID === id);
		if (item) {
			// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

	const handleClick = async (trackItem: TRACK_ITEM_TYPE[]) => {
		trackItem.forEach(async (item: ITEM_INFO_TYPE) => {
			try {
				const playInfo = getPlayInfoAxios(item.ID);
				addPropertyToItemInfo(
					item.ID,
					"playable_code",
					(await playInfo).RES_CODE
				);
				addPropertyToItemInfo(item.ID, "url", (await playInfo).INFO.URL);
			} catch (error) {
				console.error("Error fetching data for item", item.ID, error);
			}
		});

		AlbumItem.ITEM_INFO = trackItem;
		funcAlbumPlayClick("AlbumShare", AlbumItem);
	};

	return (
		<div className="FuncButtonGroup">
			{/* {pageType === "ArtistPage" ? (
				<LikeButton starPoint={0} />
			) : (
				<ThumbupButton />
			)} */}
			<LikeButton starPoint={0} />
			<Button
				type="button"
				icon="iconShare"
				onClick={() => handleClick(track)}
			/>
			<FuncButton method="album" />
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
	);
};

export default FuncButtonGroup;
