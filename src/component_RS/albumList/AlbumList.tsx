// AlbumList.tsx
"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/component/atom/icon/Icon";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./albumList.module.css"; // 여기에 AlbumItem의 스타일도 통합
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface AlbumListProps {
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	viewAllLink?: string;
}

const AlbumList = ({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	showTitle,
}: AlbumListProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && TITLE && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
					href={`/detail/album/${ID}`}
					onClick={() => {
						setSubTitle(TITLE);
					}}
				/>
			)}
			<ul className={style.albumList}>
				{ITEM_INFO.map((albumInfo: ITEM_INFO_TYPE) => (
					<li
						key={albumInfo.ID}
						onClick={() => {
							setSubTitle(albumInfo.TITLE);
							router.push(`/detail/album/track/${albumInfo.ID}`);
						}}
					>
						<Link href={`/detail/album/track/${albumInfo.ID}`}>
							<div className={style.albumItem}>
								<Image
									src={albumInfo.THUMBNAIL}
									alt={albumInfo.TITLE}
									layout="responsive"
									width={130}
									height={130}
									priority={true}
									className={style.thumbnail}
								/>
								<p className={style.title}>{albumInfo.TITLE}</p>
								<div className={style.bottomInfo}>
									<span className={style.thumbupCnt}>
										<Icon iconName="thumbUp" /> {albumInfo.NUM_THUMBUP}
									</span>
									<span className={style.bar}></span>
									<span>{albumInfo.TOTAL_NUM_TRACK}곡</span>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
