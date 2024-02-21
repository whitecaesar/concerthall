// 단일 컨텐츠 리스트


import React, { useContext } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface SingleListProps {
	// recommendList: TITEM_INFO[];
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function SingleList({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
}: SingleListProps) {
	const { setSubTitle } = useContext(SubTitleContext);
	return (
		<div style={{ paddingBottom: "5px" }}>
			<ItemListTitle.ViewAll
				isPresent={true}
				text={TITLE}
				count={TOTAL_NUM_ITEM}
				href={`/detail/single/${ID}`}
				onClick={() => {
					setSubTitle(TITLE);
				}}
			/>
			<ul className={style.singleList}>
				{ITEM_INFO.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<SingleItem singleInfo={item} />
					</li>
				))}
			</ul>
		</div>
	);
}
