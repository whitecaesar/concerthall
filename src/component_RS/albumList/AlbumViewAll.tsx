// AlbumListViewAll.tsx

"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/component/atom/icon/Icon";
import style from "./albumList.module.css"; // AlbumItem의 스타일을 AlbumList에 포함시켜야 합니다.
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface AlbumListViewAllProps {
	viewAllList: VIEWALL_LIST_TYPE;
}

export default function AlbumListViewAll({
	viewAllList: { ITEM_INFO },
}: AlbumListViewAllProps) {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{ITEM_INFO.map((albumInfo: ITEM_INFO_TYPE) => (
					<li
						key={albumInfo.ID}
						onClick={() => {
							setSubTitle(albumInfo.TITLE);
							router.push(`/detail/album/track/${albumInfo.ID}`);
						}}
					>
						<div className={style.albumItem}>
							<Link href={`/detail/album/track/${albumInfo.ID}`}>
								<div>
									<Image
										src={albumInfo.THUMBNAIL}
										alt={albumInfo.TITLE}
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
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
