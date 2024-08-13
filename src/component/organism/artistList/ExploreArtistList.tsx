// 관련 아티스트들 리스트

"use client";
import { useRouter } from "next/navigation";
import style from "./artistList.module.css";
import {
	ARTIST_INFO_TYPE,
} from "@/services/contents/ViewAllAxios";
import ExploreArtistItem from "@/component/molecule/artistItem/ExploreArtistItem";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";

interface ExploreArtistListProps {
	artistList: ARTIST_INFO_TYPE[];
}

const ExploreArtistList = (
	{artistList}: ExploreArtistListProps) => {
	const router = useRouter();

	return (
		<div
			className={style.artistListContainer}
			style={{ paddingBottom: "10px" }}
		>
			<ItemListTitle.ViewAll
				isPresent={false}
				text={"ARTIST"}
				count={artistList.length}
			/>
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

export default ExploreArtistList;
