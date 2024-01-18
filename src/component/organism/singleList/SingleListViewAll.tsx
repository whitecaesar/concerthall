import React from "react";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import style from "./singleList.module.css";
import { TVIEWALL_LIST_RES } from "@/services/contents/ViewAllAxios";
import { TITEM_INFO } from "@/types/itemInfo";

interface SingleListViewAllProps {
	viewAllList: TVIEWALL_LIST_RES;
}

export default function SingleListViewAll({
	viewAllList: { TYPE = "SINGLE", ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
}: SingleListViewAllProps) {
	return (
		<div style={{ paddingBottom: "5px" }}>
			<ul className={`${style.singleList} ${style.noScroll}`}>
				{ITEM_INFO.map((item: TITEM_INFO) => (
					<li key={item.ID}>
						<SingleItem singleInfo={item} />
					</li>
				))}
			</ul>
		</div>
	);
}
