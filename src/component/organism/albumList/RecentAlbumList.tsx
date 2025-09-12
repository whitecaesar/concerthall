// 앨범 리스트들

"use client";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import style from "./albumList.module.css";
import {ALBUM_RECENT_LIST_TYPE, ALBUM_RECENT_LIST_RESPONSE} from "@/services/contents/RecentAlbumAxios";
import RecentAlbumItem from "@/component/molecule/albumItem/RecentAlbumItem";

interface RecentAlbumListProps {
	recommendList: ALBUM_RECENT_LIST_RESPONSE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
	title: string;
}

const RecentAlbumList = ({
	recommendList: { totalCount, recentList },
	showTitle,
	noScroll = false,
	title,
}: RecentAlbumListProps) => {
	console.log("recentList", recentList);
	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && recentList && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={title}
					count={totalCount}
					href={`/detail/recentAlbum?totalcount=${totalCount}&title=${title}`}
				/>
			)}
			<ul className={style.albumList}>
				
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
};

export default RecentAlbumList;
