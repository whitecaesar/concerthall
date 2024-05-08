"use client";

import { funcPlayListTrackClick } from "@/services/common";
import { PLAYLIST_TRACK_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
type Props = {
	trackItem: PLAYLIST_TRACK_ITEM_TYPE;
    position: number;
 }
   const PLTFuncButton = ({ trackItem, position }: Props) => {
  
	const handleClick = (Item:PLAYLIST_TRACK_ITEM_TYPE, pst:number) => {
        funcPlayListTrackClick('option', Item, pst);
	};
  
	return (
	  <>
		<button
		  type="button"
		  className="funcBtn"
		  onClick={() => handleClick(trackItem, position)}
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
