import React from "react";
import style from "./itemListTitle.module.css";
import Link from "next/link";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";

interface ItemTitleProps {
	text?: string;
	count?: number;
	children?: React.ReactNode;
}

const ItemListTitle = ({ text, count, children}: ItemTitleProps) => {
	return (
		<div className={style.itemListTitle}>
			<h4>
				{text}
				{count !== undefined && <span>&#40;{count}&#41;</span>}
			</h4>
			{children}
		</div>
	);
};

interface ViewAllProps {
	isPresent: boolean;
	text: string;
	count?: number;
	// recommendList?: {
	// 	idRecom: string;
	// 	ID: string;
	// 	TYPE: string;
	// 	TITLE: string;
	// 	TOTAL_NUM_ITEM: number;
	// 	ITEM_INFO: ITEM_INFO_TYPE[];
	// };
	href?: string;
	onClick?: () => void;
}

const ViewAll = ({ isPresent, text, count, href, onClick }: ViewAllProps) => {
	return isPresent ? (
		<ItemListTitle text={text} count={count} >
			<Link href={href ? href : "/"} className={style.viewAll} onClick={onClick}>
				View All
			</Link>
		</ItemListTitle>
	) : (
		<ItemListTitle text={text} count={count} />
	);
};

// 컴파운드 컴포넌트로 할당
ItemListTitle.ViewAll = ViewAll;

export default ItemListTitle;
