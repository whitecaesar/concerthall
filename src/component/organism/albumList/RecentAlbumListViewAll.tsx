// 앨범 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 앨범들만 나열

"use client";
import style from "./albumList.module.css";
import {ALBUM_RECENT_LIST_TYPE, ALBUM_RECENT_LIST_RESPONSE} from "@/services/contents/RecentAlbumAxios";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";


interface AlbumListViewAllProps {
	recentViewAllList: ALBUM_RECENT_LIST_RESPONSE;
}

export default function RecentAlbumListViewAll({
	recentViewAllList: { totalCount, recentList },
}: AlbumListViewAllProps) {
	
	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
				{recentList.map((item: ALBUM_RECENT_LIST_TYPE) => (
					<li key={item.album.id}>
						<RecentAlbumItem
							albumInfo={item.album}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
