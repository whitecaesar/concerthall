"use client";
import { funcPlayListPlayClick } from "@/services/common";
import { TRACK_PLAYLIST_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";

  type Props = {
	playList:TRACK_PLAYLIST_ITEM_TYPE;
  }
  
  const PLFuncButton = ({ playList }: Props) => {
  
	const handleClick = (Item : TRACK_PLAYLIST_ITEM_TYPE) => {
        funcPlayListPlayClick('option', Item);
	};
  
	return (
	  <>
		<button
		  type="button"
		  className="funcBtn"
		  onClick={() => handleClick(playList)}
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
  
  export default PLFuncButton;
