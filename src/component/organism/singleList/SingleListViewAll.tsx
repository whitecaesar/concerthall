// 싱글 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 컨텐츠들만 나열

import React from "react";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import style from "./singleList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface SingleListViewAllProps {
	viewAllList: VIEWALL_LIST_TYPE;
}

export default function SingleListViewAll({
	viewAllList: { ITEM_INFO },
}: SingleListViewAllProps) {
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ul className={`${style.singleList} ${style.noScroll}`}>
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<SingleItem singleInfo={item} />
					</li>
				))}
			</ul>
		</div>
	);
}
