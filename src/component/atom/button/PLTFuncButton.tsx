"use client";

import { funcPlayListPlayClick, funcPlayListTrackClick } from "@/services/common";
import { TRACK_PLAYLIST_TYPE, TRACK_TRACKS_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
type Props = {
	trackItem: TRACK_RECENT_ITEM_TYPE;
	trackListItem:TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE;
    position: number;
	method: string;
 }
   const PLTFuncButton = ({ trackItem, trackListItem, position, method }: Props) => {
  
	const handleClick = (Item:TRACK_RECENT_ITEM_TYPE, ListItem:TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE, pst:number, method:string) => {

		if(method == 'track')
		{
			funcPlayListTrackClick('option', trackItem, trackListItem, pst);
		}
		else if(method == 'playlist')
		{
        	funcPlayListPlayClick('trackoption', trackListItem, pst);
		}
	};
  
	return (
	  <>
		<button
		  type="button"
		  className="funcBtn"
		  onClick={() => handleClick(trackItem, trackListItem, position, method)}
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
  
  export default PLTFuncButton;
