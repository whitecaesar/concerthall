// SingleList.tsx

"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface SingleListProps {
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
}

export default function SingleList({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	showTitle,
}: SingleListProps) {
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div style={{ paddingBottom: "10px" }}>
			{showTitle && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
					href={`/detail/single/${ID}`}
					onClick={() => {
						setSubTitle(TITLE);
					}}
				/>
			)}
			<ul className={style.singleList}>
				{ITEM_INFO.map((singleInfo: ITEM_INFO_TYPE) => (
					<li key={singleInfo.ID}>
						<div className={style.singleItem} id={`${singleInfo.ID}`}>
							<Link href="">
								<Image
									src={singleInfo.THUMBNAIL}
									alt={singleInfo.TITLE}
									layout="responsive"
									width={250}
									height={100}
									priority={true}
									className={style.thumbnail}
								/>
								<p className={style.title}>{singleInfo.TITLE}</p>
							</Link>
							<div className={style.bottomInfo}>
								<p className={style.artist}>{singleInfo.ARTIST}</p>
								<div className={style.buttonGroup}>
									<LikeButton />
									<FuncButton funcClick={() => {}} />
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
