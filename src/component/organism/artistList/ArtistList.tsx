// 관련 아티스트들 리스트

"use client";
import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./artistList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import ArtistItem from "@/component/molecule/artistItem/ArtistItem";

interface ArtistListProps {
	artistList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	viewAllLink?: string;
}

const ArtistList = ({
	artistList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
}: ArtistListProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div
			className={style.artistListContainer}
			style={{ paddingBottom: "10px" }}
		>
			<ItemListTitle.ViewAll
				isPresent={true}
				text={"Related Artist"}
				count={TOTAL_NUM_ITEM}
				href={`/detail/album/${ID}`}
				onClick={() => {
					setSubTitle(TITLE);
				}}
			/>
			<ul className={style.artistList}>
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						{/*
						<ArtistItem
							albumInfo={item}
							onClick={() => {
								setSubTitle(item.TITLE);
								router.push(`/detail/album/track/${item.ID}`);
							}}
						/>*/}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArtistList;
