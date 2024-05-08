"use client";
import Image from "next/image";
import style from "./singleItem.module.css";
import { funcPlayListTrackClick} from "@/services/common";
import PLTFuncButton from "@/component/atom/button/PLTFuncButton";
import { PLAYLIST_TRACK_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import PLTLikeButton from "@/component/atom/button/PLTLikeButton";

export default function RecentTrackListItem({
	trackListInfo,
	position
}: {
	trackListInfo: PLAYLIST_TRACK_ITEM_TYPE;
	position:number;
}) {

	return (
		<div className={style.singleItem} id={`${trackListInfo.id}`}>
			<span onClick={() => funcPlayListTrackClick('play', trackListInfo, position)}>
				<Image
					src={trackListInfo.thumbnailUrl}
					alt={trackListInfo.title}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackListInfo.title}</p>
			</span>
			<div className={style.bottomInfo}>
				<p className={style.artist}>{trackListInfo.arists}</p>
				<div className={style.buttonGroup}>
					<PLTLikeButton starPoint={trackListInfo.star} track_id={trackListInfo.id}/>
					<PLTFuncButton trackItem={trackListInfo} position={position}/>
					{/* 기능 로직 넣으세요. */}
				</div>
			</div>
		</div>
	);
}
