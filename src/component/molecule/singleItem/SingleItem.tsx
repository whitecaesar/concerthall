"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleItem.module.css";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";


export default function SingleItem({
	singleInfo,
}: {
	singleInfo: ITEM_INFO_TYPE;
}) {
	return (
		<div className={style.singleItem} id={`${singleInfo.ID}`}>
			<Link href="">
				<Image
					src={singleInfo.THUMBNAIL}
					alt={singleInfo.TITLE}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{singleInfo.TITLE}</p>
			</Link>
			<div className={style.bottomInfo}>
				<p className={style.artist}>{singleInfo.ARTIST}</p>
				<div className={style.buttonGroup}>
					<LikeButton />
					<FuncButton method="single"/>
					{/* 기능 로직 넣으세요. */}
				</div>
			</div>
		</div>
	);
}
