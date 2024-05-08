"use client";
import Image from "next/image";
import style from "./trackItem.module.css";
import { funcPlayListTrackClick} from "@/services/common";
import { PLAYLIST_TRACK_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import PLTFuncButton from "@/component/atom/button/PLTFuncButton";
import PLTLikeButton from "@/component/atom/button/PLTLikeButton";

interface PLTrackItemProps {
	trackInfo: PLAYLIST_TRACK_ITEM_TYPE;
    position: number;
}

export default function PLTrackItem({ trackInfo, position }: PLTrackItemProps) {
	return (
		<div className={style.trackItem}>
			<span onClick={() => funcPlayListTrackClick('play', trackInfo, position)}>
				{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
				<Image
					src={trackInfo.thumbnailUrl}
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
				<PLTFuncButton trackItem={trackInfo} position={position}/>
			</div>
		</div>
	);
}
