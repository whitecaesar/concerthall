"use client";

import { funcAlbumPlayClick, funcTrackPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";
import { PLAY_ITEM_RESPONSE } from "@/services/contents/PlayInfoAxios";
import { TRACK_RECENT_ITEM_TYPE } from "@/services/contents/RecentTrackListAxios";
import { TRACK_INFO_RESPONSE } from "@/services/contents/TrackAxios";
import { formToJSON } from "axios";


type Props = {
	method: string;
	track_info?: TRACK_INFO_RESPONSE;
	play_info?: PLAY_ITEM_RESPONSE;
	album_info?: ALBUM_DETAIL_TYPE;
	recent_track_info?: TRACK_RECENT_ITEM_TYPE;
  }
  
  const AlbumFuncButton = () => {

	const handleClick = () => {
	};

	return (
	  <>
		<button
		  type="button"
		  className="funcBtn"
		  onClick={handleClick}
		></button>
		<style jsx>{`
		  .funcBtn {
			display: inline-block;
			width: 20px;
			height: 20px;
			background: url(/images/icon/png/icon_option.png) center center no-repeat;
			background-size: contain;
		  }
		`}</style>
	  </>
	);
  };
  
  export default AlbumFuncButton;
