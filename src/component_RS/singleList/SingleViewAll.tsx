// SingleListViewAll.tsx

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleList.module.css";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";

interface SingleListViewAllProps {
	viewAllList: VIEWALL_LIST_TYPE;
}

export default function SingleListViewAll({
	viewAllList: { ITEM_INFO },
}: SingleListViewAllProps) {
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ul className={`${style.singleList} ${style.noScroll}`}>
				{ITEM_INFO.map((singleInfo) => (
					<li
						key={singleInfo.ID}
						className={style.singleItem}
						id={`${singleInfo.ID}`}
					>
						<Link href="">
							<div>
								<Image
									src={singleInfo.THUMBNAIL}
									alt={singleInfo.TITLE}
									layout="responsive"
									width={150}
									height={85}
									priority={true}
									className={style.thumbnail}
								/>
								<p className={style.title}>{singleInfo.TITLE}</p>
								<p className={style.artist}>{singleInfo.ARTIST}</p>
							</div>
						</Link>
						<div className={style.bottomInfo}>
							<div className={style.buttonGroup}>
								<LikeButton />
								<FuncButton funcClick={() => {}} />
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
