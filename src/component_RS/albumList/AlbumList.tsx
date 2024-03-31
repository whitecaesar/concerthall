// AlbumList.tsx
"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/component_RS/button/icon/Icon";
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
	//showTitle: boolean;
	viewAllLink?: string;
	isTitle?: boolean;
}

const AlbumList = ({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	isTitle = true,
}: AlbumListProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div className={style.albumListContainer}>
			{isTitle &&
				TITLE && ( // isTitle과 TITLE 존재 여부를 모두 확인
					<ItemListTitle.ViewAll
						isPresent={isTitle} // 이제 isTitle을 이용하여 조건부 렌더링
						text={TITLE}
						count={TOTAL_NUM_ITEM}
						href={`/RS/detail/album/${ID}`}
						onClick={() => {
							setSubTitle(TITLE);
							// 필요한 경우 페이지 이동 로직을 여기에 추가
						}}
					/>
				)}
			<ul className={style.albumList}>
				{ITEM_INFO.map((albumInfo: ITEM_INFO_TYPE) => (
					<li
						key={albumInfo.ID}
						onClick={() => {
							setSubTitle(albumInfo.TITLE);
							router.push(`/RS/detail/album/track/${albumInfo.ID}`);
						}}
					>
						<div className={style.albumItem}>
							<Link href={`/RS/detail/album/track/${albumInfo.ID}`}>
								<Image
									//src={albumInfo.THUMBNAIL}
									src="/images/dummy/dummy_RS_album.png" //임시로 넣어놓은 더미 이미지입니다.
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
										{/* <span className={style.thumbupCnt}>
											<Icon iconName="thumbUp" /> {albumInfo.NUM_THUMBUP}
										</span>
										<span className={style.bar}></span> */}
										<span>{albumInfo.TOTAL_NUM_TRACK}개 동영상</span>
									</div>
								</div>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
