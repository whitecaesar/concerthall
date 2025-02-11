// AlbumList.tsx

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface AlbumListProps {
	recommendList: VIEWALL_LIST_TYPE;
	viewAllLink?: string;
	isTitle?: boolean;
}

const AlbumList = ({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	isTitle = true,
}: AlbumListProps) => {
	return (
		<div className={style.albumListContainer}>
			<ul className={style.albumList}>
				{ITEM_INFO.map((albumInfo: ITEM_INFO_TYPE) => (
					<li
						key={albumInfo.ID}
					>
						<Link href={`/RS/track/${albumInfo.ID}`}>
							<Image
								src="/images/dummy/dummy_RS_album.png"
								alt={albumInfo.TITLE}
								width={375}
								height={176}
								priority={true}
								className={style.thumbnail}
							/>
							<div className={style.bottomInfo}>
								<div className={style.titleWrap}>
									<p className={style.title}>{albumInfo.TITLE}</p>
								</div>
								<div className={style.bottomDetail}>
									<span>{albumInfo.TOTAL_NUM_TRACK}개 동영상</span>
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
