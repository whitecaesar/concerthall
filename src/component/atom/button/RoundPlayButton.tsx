import { funcAlbumPlayClick, funcTrackPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import React, { useState } from "react";

interface allPlayProp {
	AlbumItem : ALBUM_DETAIL_TYPE;	
}

const RoundPlayButton = ({AlbumItem} :allPlayProp) => {
	const track = AlbumItem.ITME_INFO;
	function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:string) {
		const item = AlbumItem.ITME_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}
	
	const handleClick = async(trackItem : ALBUM_ITEM_TYPE[]) => {
		trackItem.forEach(async (item :ALBUM_ITEM_TYPE) => {
			try {
				const playInfo = getPlayInfoAxios(item.ID);
				addPropertyToItemInfo(item.ID, 'PLAYABLE_CODE',(await playInfo).RES_CODE);
				addPropertyToItemInfo(item.ID, 'URL',(await playInfo).INFO.URL);
			} catch (error) {
				console.error('Error fetching data for item', item.ID, error);
			}
		});
	
		AlbumItem.ITME_INFO = trackItem;
		funcAlbumPlayClick('AlbumPlay',AlbumItem);
	}
	
	return (
		<>
			<button
				type="button"
				className="trackPlayBtn"
				onClick={()=> handleClick(track)}
			></button>
			<style jsx>{`
				.trackPlayBtn {
					display: inline-block;
					width: 56px;
					height: 56px;
					background: url(/images/icon/png/icon_track_play.png) center center
						no-repeat;
					background-size: contain;
					margin-left: 12px;
				}
			`}</style>
		</>
	);
};


export default RoundPlayButton;


