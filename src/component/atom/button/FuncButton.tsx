"use client";

import { funcAlbumPlayClick, funcTrackPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";
import { PLAY_ITEM_RESPONSE } from "@/services/contents/PlayInfoAxios";
import { TRACK_INFO_RESPONSE } from "@/services/contents/TrackAxios";
import { formToJSON } from "axios";


type Props = {
	method: string;
	track_info?: TRACK_INFO_RESPONSE;
	play_info?: PLAY_ITEM_RESPONSE;
	album_info?: ALBUM_DETAIL_TYPE;
  }
  
  const FuncButton = ({ method, track_info, play_info, album_info }: Props) => {
  
	const handleClick = () => {
	  if (!track_info || !play_info) {
		console.error("Track info or Play info is missing!");
		return; // 에러 메시지 출력하고 함수 종료
	  }
  
	  if (method === 'trackMore') {
		funcTrackPlayClick(method, play_info, track_info.TRACK_INFO);
	  } else {
		//funcAlbumPlayClick(method, play_info, track_info.TRACK_INFO);
	  }
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
  
  export default FuncButton;
