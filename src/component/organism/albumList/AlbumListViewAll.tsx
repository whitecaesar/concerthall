// 앨범 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 앨범들만 나열

"use client";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import style from "./albumList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface AlbumListViewAllProps {
	viewAllList: VIEWALL_LIST_TYPE;
}

export default function AlbumListViewAll({
	viewAllList: { ITEM_INFO },
}: AlbumListViewAllProps) {

	return (
		<div className={style.albumListContainer}>
			<ul className={`${style.albumList} ${style.noScroll}`}>
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
}
