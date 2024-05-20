import React from "react";
import { TRACK_PLAYLIST_TYPE } from "@/services/contents/PlayListTrackAxios";
import { funcPlayListPlayClick } from "@/services/common";

interface sufflePlayProp {
	TrackItem : TRACK_PLAYLIST_TYPE; 	
}

const PlayListShuffleButton = ({TrackItem} :sufflePlayProp) => {

	const handleClick = async(Item : TRACK_PLAYLIST_TYPE) => {
		//funcAlbumPlayClick('AlbumPlay',AlbumItem);
		funcPlayListPlayClick('sufflePlay', Item)
	}
	return (
		<>
			<button
				type="button"
				className="trackShuffleBtn"
				onClick={()=> handleClick(TrackItem)}
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

export default PlayListShuffleButton;
