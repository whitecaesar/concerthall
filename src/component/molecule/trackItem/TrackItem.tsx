"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./trackItem.module.css";
import { ItemInfoType } from "@/interface/itemInfoType";

export default function TrackItem(props: { trackInfo: ItemInfoType }) {
	const { trackInfo } = props;

	return (
		<div className={style.trackItem}>
			<Link href="">
				<Image
					src={trackInfo.singleThumbnail}
					alt={trackInfo.title}
					width={45}
					height={45}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackInfo.title}</p>
				<p className={style.artist}>{trackInfo.artist}</p>
			</Link>
			<div className={style.buttonGroup}>
				<LikeButton />
				<FuncButton />
			</div>
		</div>
	);
}
