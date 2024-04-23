"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleItem.module.css";
import {PLAY_RECENT_ITEM_TYPE} from "@/services/contents/RecentPlayListAxios";



export default function RecentPlayListItem({
	playListInfo,
}: {
	playListInfo: PLAY_RECENT_ITEM_TYPE;
}) {
	return (
		<div className={style.singleItem} id={`${playListInfo.id}`}>
			<Link href="">
				<Image
					src={playListInfo.thumbnail}
					alt={playListInfo.title}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{playListInfo.title}</p>
			</Link>
			<div className={style.bottomInfo}>
				<p className={style.artist}>{playListInfo.ownerName}</p>
				<div className={style.buttonGroup}>
					<LikeButton star={0}/>
					<FuncButton method="single"/>
					{/* 기능 로직 넣으세요. */}
				</div>
			</div>
		</div>
	);
}
