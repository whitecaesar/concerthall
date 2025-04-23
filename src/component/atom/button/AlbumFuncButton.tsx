"use client";

import { funcAlbumPlayClick, funcTrackPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { PLAY_ITEM_RESPONSE, getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { TRACK_RECENT_ITEM_TYPE } from "@/services/contents/RecentTrackListAxios";
import { TRACK_INFO_RESPONSE } from "@/services/contents/TrackAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import { useEffect } from "react";


type Props = {
	method: string;
	track_info?: TRACK_INFO_RESPONSE;
	play_info?: PLAY_ITEM_RESPONSE;
	album_info?: ALBUM_DETAIL_TYPE;
	recent_track_info?: TRACK_RECENT_ITEM_TYPE;
	trackListInfo?:VIEWALL_LIST_TYPE;
	albumTrackList:ALBUM_ITEM_TYPE[];
	position?:number;
  }
  
  const AlbumFuncButton = ({ method, track_info, album_info, recent_track_info, trackListInfo, position, albumTrackList }: Props) => {

	const handleClick = () => {
	  if (method === 'albumTrackMore') {
			if (!albumTrackList) {
				console.error("AlbumTrack info is missing!");
				return; // 에러 메시지 출력하고 함수 종료
			}

			funcTrackPlayClick(method, track_info?.TRACK_INFO, trackListInfo, position, albumTrackList);
	  } else if(method == 'albumMore'){
			if (!album_info) {
				console.error("Album info is missing!");
				return; // 에러 메시지 출력하고 함수 종료
			}
			funcAlbumPlayClick(method, album_info);
	  } 
			else if(method == 'recentTrackMore') {
			if (!recent_track_info) {
				console.error("recent_track info  is missing!");
				return; // 에러 메시지 출력하고 함수 종료
			}
			//funcTrackPlayClick(method, play_info, recent_track_info);
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
  
  export default AlbumFuncButton;
