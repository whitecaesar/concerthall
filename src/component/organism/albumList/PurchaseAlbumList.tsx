"use client";
import {
  ITEM_INFO_TYPE,
} from "@/services/contents/ViewAllAxios";
import { useEffect, useState } from "react";
import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumItem from "@/component/molecule/albumItem/AlbumItem";
import style from "./albumList.module.css";

interface PurcahseAlbumListProps {
	albumList?: ITEM_INFO_TYPE[];
}

export default function PurchaseAlbumList({ albumList }: PurcahseAlbumListProps) {
  return (
		<>
			<div className={style.albumListContainer}>

			<ul className={`${style.albumList} ${style.noScroll}`}>
				{albumList?.map((item: ITEM_INFO_TYPE, index: number) => (
					<li key={index}>
						<AlbumItem
							albumInfo={item}
              type='purchase'
						/>
					</li>
				))}
			</ul>
      <style jsx>{`
					.trackNum {
						padding: 10px 15px;
						font-size: 13px;
						position: sticky;
						top: 0;
						z-index: 1;
					}
			`}</style>
		</div>
		</>
	);
}
