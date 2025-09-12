"use client";
import Image from "next/image";
import style from "./trackItem.module.css";
import { funcPlayListTrackClick} from "@/services/common";
import { TRACK_PLAYLIST_TYPE } from "@/services/contents/PlayListTrackAxios";
import PLTFuncButton from "@/component/atom/button/PLTFuncButton";
import PLTLikeButton from "@/component/atom/button/PLTLikeButton";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";

interface PLTrackItemProps {
	trackInfo: TRACK_RECENT_ITEM_TYPE;
	trackListInfo: TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE;
  position: number;
	method: string;
}

export default function PLTrackItem({trackInfo, trackListInfo, position, method }: PLTrackItemProps) {

	return (
		<div className={style.trackItem}>
			<span onClick={() => funcPlayListTrackClick('play', trackInfo, trackListInfo, position)}>
				{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
				<Image
					src={trackInfo.thumbnailUrl ? trackInfo.thumbnailUrl : "/images/hifiRoseSmall.png"}
					alt={trackInfo.title}
					width={45}
					height={45}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackInfo.title}</p>
				<p className={style.artist}>{trackInfo.arists}</p>
			</span>
			<div className={style.buttonGroup}>
				<PLTLikeButton starPoint={trackInfo.star} track_id={trackInfo.id}/>
				<PLTFuncButton trackItem={trackInfo} trackListItem={trackListInfo} position={position} method={method}/>
			</div>
		</div>
	);
}
