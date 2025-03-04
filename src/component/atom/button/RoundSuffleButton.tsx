import { funcAlbumPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import React, { useEffect } from "react";

interface allPlayProp {
	AlbumItem : ALBUM_DETAIL_TYPE;	
}

const RoundShuffleButton = ({AlbumItem} :allPlayProp) => {

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
