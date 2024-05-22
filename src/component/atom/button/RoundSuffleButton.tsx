import { funcAlbumPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import React, { useEffect } from "react";

interface allPlayProp {
	AlbumItem : ALBUM_DETAIL_TYPE;	
}

const RoundShuffleButton = ({AlbumItem} :allPlayProp) => {

	function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:string) {
		const item = AlbumItem.ITME_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

	useEffect(() => {
		AlbumItem.ITME_INFO.forEach(async (item: ALBUM_ITEM_TYPE) => {
			try {
				const playInfo = getPlayInfoAxios(item.ID);
				addPropertyToItemInfo(item.ID, 'playable_code',(await playInfo).RES_CODE);
				addPropertyToItemInfo(item.ID, 'url',(await playInfo).INFO.URL);
			} catch (error) {
				console.error("Error fetching data for item", item.ID, error);
			}
		});
	}, [])

	const handleClick = async() => {
		funcAlbumPlayClick('SufflePlay',AlbumItem);
	}

	return (
		<>
			<button
				type="button"
				className="trackShuffleBtn"
				onClick={()=> handleClick()}
			></button>
			<style jsx>{`
				.trackShuffleBtn {
					display: inline-block;
					width: 40px;
					height: 40px;
					background: url(/images/icon/png/icon_track_shuffle.png) center center
						no-repeat;
					background-size: contain;
					margin-left: 12px;
				}
			`}</style>
		</>
	);
};

export default RoundShuffleButton;
