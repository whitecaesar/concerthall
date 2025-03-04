import { funcAlbumPlayClick} from "@/services/common";
import { ALBUM_DETAIL_TYPE} from "@/services/contents/AlbumAxios";
import React from "react";

interface allPlayProp {
	AlbumItem : ALBUM_DETAIL_TYPE;	
}

const RoundPlayButton = ({AlbumItem} :allPlayProp) => {
	const handleClick = () => {
		funcAlbumPlayClick('AlbumPlay',AlbumItem);
	}

	return (
		<>
			<button
				type="button"
				className="trackPlayBtn"
				onClick={()=> handleClick()}
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


