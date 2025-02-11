// 아티스트들 전부 보여주는 컴포넌트 (ex 즐겨찾기, Relatid Artist의 ViewAll)

"use client";
import style from "./artistList.module.css";
import ArtistItem from "@/component/molecule/artistItem/ArtistItem";
import { ARTIST_LIST_ARTISTDTOS_TYPE, ARTIST_LIST_RESPONSE_TYPE } from "@/services/contents/LikeArtistAxios";

interface ArtistListViewAllProps {
	viewAllList: ARTIST_LIST_RESPONSE_TYPE;
}

export default function ArtistListViewAll({
	viewAllList: { artistDtos },
}: ArtistListViewAllProps) {
	return (
		<div className={style.artistListContainer}>
			<ul className={`${style.artistList} ${style.noScroll}`}>
				{artistDtos.map((item: ARTIST_LIST_ARTISTDTOS_TYPE) => (
					<li key={item.id}>
						<ArtistItem
							artistInfo={item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
