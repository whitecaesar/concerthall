"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../button/LikeButton";
import FuncButton from "../button/FuncButton";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./trackList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface TrackListProps {
	recommendList: VIEWALL_LIST_TYPE;
	isTitle?: boolean;
}

function TrackList({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	isTitle = true, // 기본값을 true로 설정하여, 명시적으로 false가 주어지지 않으면 항상 표시
}: TrackListProps) {
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div>
			{isTitle && ( // 조건부 렌더링
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
					href={`/RS/track/${ID}`}
					onClick={() => {
						setSubTitle(TITLE);
					}}
				/>
			)}
			<ul className={style.trackList}>
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<div className={style.trackItem} id={`${item.ID}`}>
							<Link href="">
								<Image
									// src={item.THUMBNAIL}
									src="/images/dummy/dummy_RS_track.png" // 임시로 넣어놓은 더미 이미지입니다.
									alt={item.TITLE}
									//layout="responsive"
									width={373}
									height={180}
									priority={true}
									className={style.thumbnail}
								/>
								<div className={style.bottomInfo}>
									<div className={style.titleWrap}>
										<p className={style.title}>{item.TITLE}</p>
									</div>
									<p className={style.artist}>{item.ARTIST}</p>
									<p className={style.bottomDetail}>
										<span>3:50</span>
										<span className={style.bar}></span>
										<span>조회수 200</span>
									</p>
								</div>
							</Link>
							<div className={style.buttonGroup}>
								<LikeButton />
								<FuncButton method="single" />
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default TrackList;
