// 관련 아티스트들 리스트

"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./artistList.module.css";
import {
	ARTIST_INFO_TYPE,
} from "@/services/contents/ViewAllAxios";
import ExploreArtistItem from "@/component/molecule/artistItem/ExploreArtistItem";

interface ArtistListProps {
	artistList: ARTIST_INFO_TYPE[];
}

const ArtistList = (
	{artistList}: ArtistListProps) => {
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

	return (
		<div
			className={style.artistListContainer}
			style={{ paddingBottom: "10px" }}
		>
			{/*}
			<ItemListTitle.ViewAll
				isPresent={true}
				text={"Related Artist"}
				count={TOTAL_NUM_ITEM}
				href={`/detail/album/${ID}`}
				onClick={() => {
					setSubTitle(TITLE);
				}}
			/>
			*/}
			<ul className={style.artistList}>
				{artistList.map((item: ARTIST_INFO_TYPE) => (
					<li key={item.artist_id}>
						<ExploreArtistItem
							artistInfo={item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArtistList;
