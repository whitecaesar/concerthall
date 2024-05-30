// 앨범 리스트들
"use client";
import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import { useRouter } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";
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
	const router = useRouter();
	const { setSubTitle } = useContext(SubTitleContext);

    console.log(recommendList.ARTIST_ALBUM_INFO);

	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && recommendList && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text='아티스트 앨범'
					count={recommendList.ARTIST_ALBUM_INFO.length}
					href={`/detail/album/`}
					onClick={() => {
						setSubTitle('아티스트 앨범');
					}}
				/>
			)}
			<ul className={style.albumList}>
				
				{recommendList.ARTIST_ALBUM_INFO.map((item: ARTIST_ALBUM_INFO_TYPE) => (
					<li key={item.ID}>
						<ArtistAlbumItem
							artistInfo={item}
							onClick={() => {
								setSubTitle(item.TITLE);
								//router.push(`/detail/album/track/${item.ID}`);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArtistAlbumList;
