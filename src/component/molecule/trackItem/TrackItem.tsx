"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./trackItem.module.css";
import { TRACK_ITEM_TYPE } from "@/services/contents/TrackAxios";

interface TrackItemProps {
	trackInfo: TRACK_ITEM_TYPE;
}

export default function TrackItem({ trackInfo }: TrackItemProps) {

	return (
		<div className={style.trackItem}>
			<Link href={`/album/track/${trackInfo.ID}`}>
				{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
				<Image
					src={trackInfo.THUMBNAIL}
					alt={trackInfo.TITLE}
					width={45}
					height={45}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackInfo.TITLE}</p>
				<p className={style.artist}>{trackInfo.ARTIST}</p>
			</Link>
			<div className={style.buttonGroup}>
				<LikeButton />
				<FuncButton method="track"/>
			</div>
		</div>
	);
}
