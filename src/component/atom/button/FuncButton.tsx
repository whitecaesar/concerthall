"use client";

import { funcAlbumPlayClick, funcTrackPlayClick } from "@/services/common";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { PLAY_ITEM_RESPONSE, getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { TRACK_RECENT_ITEM_TYPE } from "@/services/contents/RecentTrackListAxios";
import { TRACK_INFO_RESPONSE } from "@/services/contents/TrackAxios";
import { ITEM_INFO_TYPE, VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import { formToJSON } from "axios";


type Props = {
	method: string;
	track_info?: TRACK_INFO_RESPONSE;
	play_info?: PLAY_ITEM_RESPONSE;
	album_info?: ALBUM_DETAIL_TYPE;
	recent_track_info?: TRACK_RECENT_ITEM_TYPE;
	trackListInfo?:VIEWALL_LIST_TYPE;
	position?:number;
  }
  
  const FuncButton = ({ method, track_info, play_info, album_info, recent_track_info, trackListInfo, position }: Props) => {

	console.log(trackListInfo);
	function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:string) {
		const item = trackListInfo?.ITEM_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

	function addPropertyToAlbumItemInfo(id :string, propertyName:string, propertyValue:string) {
		const item = album_info?.ITME_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

	const handleClick = () => {
	  if (method === 'trackMore') {
		if (!track_info || !play_info) {
			console.error("Track info or Play info is missing!");
			return; // 에러 메시지 출력하고 함수 종료
		}

		trackListInfo?.ITEM_INFO.forEach(async (item: ITEM_INFO_TYPE) => {
			try {
				const playInfo = getPlayInfoAxios(item.ID);
				addPropertyToItemInfo(item.ID, "PLAYABLE_CODE", (await playInfo).RES_CODE);
				addPropertyToItemInfo(item.ID, "URL", (await playInfo).INFO.URL);
			} catch (error) {
				console.error("Error fetching data for item", item.ID, error);
			}
		});

		console.log(trackListInfo?.ITEM_INFO);
		

		funcTrackPlayClick(method, play_info, track_info.TRACK_INFO, trackListInfo, position);
	  } else if(method == 'albumMore'){
		if (!album_info) {
			console.error("Track info or Play info is missing!");
			return; // 에러 메시지 출력하고 함수 종료
		}

		album_info?.ITME_INFO.forEach(async (item: ALBUM_ITEM_TYPE) => {
			try {
				const AlbumPlayInfo = getPlayInfoAxios(item.ID);
				addPropertyToAlbumItemInfo(item.ID, "PLAYABLE_CODE", (await AlbumPlayInfo).RES_CODE);
				addPropertyToAlbumItemInfo(item.ID, "URL", (await AlbumPlayInfo).INFO.URL);
			} catch (error) {
				console.error("Error fetching data for item", item.ID, error);
			}
		});

		funcAlbumPlayClick(method, album_info);
	  } 
	  else if(method == 'recentTrackMore') {
		if (!recent_track_info || !play_info) {
			console.error("recent_track info or Play info is missing!");
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
  
  export default FuncButton;
