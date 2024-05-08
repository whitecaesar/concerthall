import { funcPlayListPlayClick } from "@/services/common";
import { PLAYLIST_TRACK_ITEM_TYPE, TRACK_PLAYLIST_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import React from "react";

interface allPlayProp {
	ListItem : TRACK_PLAYLIST_ITEM_TYPE; 	
}

const PlayListAllButton = ({ListItem} :allPlayProp) => {

	const handleClick = async(Item : TRACK_PLAYLIST_ITEM_TYPE) => {
		funcPlayListPlayClick('allPlay', Item)
	}
	
	return (
		<>
			<button
				type="button"
				className="trackPlayBtn"
				onClick={()=> handleClick(ListItem)}
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


export default PlayListAllButton;


