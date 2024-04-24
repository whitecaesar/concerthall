import { funcAlbumPlayClick, funcTrackPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE, TRACK_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import React, { useState } from "react";

interface allPlayProp {
	AlbumItem : ALBUM_DETAIL_TYPE;	
}

const RoundPlayButton = ({AlbumItem} :allPlayProp) => {
	const track = AlbumItem.ITEM_INFO;
	function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:string) {
		const item = AlbumItem.ITEM_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}
	
	const handleClick = async(trackItem : TRACK_ITEM_TYPE[]) => {
		trackItem.forEach(async (item :ITEM_INFO_TYPE) => {
			try {
				const playInfo = getPlayInfoAxios(item.ID);
				addPropertyToItemInfo(item.ID, 'playable_code',(await playInfo).RES_CODE);
				addPropertyToItemInfo(item.ID, 'url',(await playInfo).INFO.URL);
			} catch (error) {
				console.error('Error fetching data for item', item.ID, error);
			}
		});
	
		AlbumItem.ITEM_INFO = trackItem;
		funcAlbumPlayClick('ShufflePlay',AlbumItem);
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


