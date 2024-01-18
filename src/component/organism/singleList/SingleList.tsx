import React from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import style from "./singleList.module.css";
import {
	TRECOMMEND_LIST_RES,
	getBannersAxios,
} from "@/services/banner/MainInfoAxios";
import { TITEM_INFO } from "@/types/itemInfo";

interface SingleListProps {
	// recommendList: TITEM_INFO[];
	recommendList: TRECOMMEND_LIST_RES;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function SingleList({
	recommendList: { TYPE = "SINGLE", ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
}: SingleListProps) {
	return (
		<div style={{ paddingBottom: "5px" }}>
			<ItemListTitle.ViewAll
				isPresent={true}
				text={TITLE}
				count={TOTAL_NUM_ITEM}
			/>
			<ul className={style.singleList}>
				{ITEM_INFO.map((item: TITEM_INFO) => (
					<li key={item.ID}>
						<SingleItem singleInfo={item} />
					</li>
				))}
			</ul>
		</div>
	);
}
