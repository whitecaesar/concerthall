"use client";
import Image from "next/image";
import style from "./singleItem.module.css";
import { funcPlayListTrackClick} from "@/services/common";
import PLTFuncButton from "@/component/atom/button/PLTFuncButton";
import PLTLikeButton from "@/component/atom/button/PLTLikeButton";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";

export default function RecentTrackListItem({
	trackListInfo,
	trackInfo,
	position
}: {
	trackListInfo: TRACK_RECENT_LIST_RESPONSE;
	trackInfo: TRACK_RECENT_ITEM_TYPE;
	position:number;
}) {

	return (
		<div className={style.singleItem} id={`${trackInfo.id}`}>
			<span onClick={() => funcPlayListTrackClick('play', trackInfo, trackListInfo, position)}>
				<Image
					src={trackInfo.thumbnailUrl}
					alt={trackInfo.title}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackInfo.title}</p>
			</span>
			<div className={style.bottomInfo}>
				<p className={style.artist}>{trackInfo.arists}</p>
				<div className={style.buttonGroup}>
					<PLTLikeButton starPoint={trackInfo.star} track_id={trackInfo.id}/>
					<PLTFuncButton trackItem={trackInfo} trackListItem={trackListInfo} position={position} method='track'/>
					{/* 기능 로직 넣으세요. */}
				</div>
			</div>
		</div>
	);
}
