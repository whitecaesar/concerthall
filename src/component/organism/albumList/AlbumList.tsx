// 앨범 리스트들

"use client";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import style from "./albumList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface AlbumListProps {
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	noScroll?: boolean;
	viewAllLink?: string;
}

const AlbumList = ({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
	showTitle,
	noScroll = false,
}: AlbumListProps) => {
	
	return (
		<div className={style.albumListContainer} style={{ paddingBottom: "10px" }}>
			{showTitle && TITLE && (
				<ItemListTitle.ViewAll
					isPresent={true}
					text={TITLE}
					count={TOTAL_NUM_ITEM}
					href={`/detail/album/${ID}?title=${encodeURIComponent(TITLE)}`}
				/>
			)}
			<ul className={style.albumList}>
				
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<AlbumItem
							albumInfo={item}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
