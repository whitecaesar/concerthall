// 앨범 리스트들
"use client";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./albumList.module.css";
import { ARTIST_ALBUM_INFO_TYPE, ARTIST_INFO_RESPONSE } from "@/services/contents/ArtistInfoAxios";
import ArtistAlbumItem from "@/component/molecule/albumItem/ArtistAlbumItem";

interface ArtistAlbumListProps {
	recommendList: ARTIST_INFO_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
}

const ArtistAlbumList = ({
	recommendList,
	showTitle,
	noScroll = false,
}: ArtistAlbumListProps) => {

	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && recommendList && (
				<ItemListTitle.ViewAll
					isPresent={false}
					text='아티스트 앨범'
					count={recommendList.ARTIST_ALBUM_INFO.length}
					href={`/detail/album/`}
				/>
			)}
			<ul className={style.albumList}>
				
				{recommendList.ARTIST_ALBUM_INFO.map((item: ARTIST_ALBUM_INFO_TYPE) => (
					<li key={item.ID}>
						<ArtistAlbumItem
							artistInfo={item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArtistAlbumList;
