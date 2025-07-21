"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import { ITEM_INFO_TYPE, VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";

interface AlbumItemProps {
	albumInfo: ITEM_INFO_TYPE;
	onClick?: () => void;
	type?: string;
	handlePopupOpen?: (message: string) => void;
	handleCancelOpen?: (track: ITEM_INFO_TYPE) => void;
}

const AlbumItem = ({ albumInfo, onClick, type, handleCancelOpen }: AlbumItemProps) => {
	
	return (
		<>
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/album/track/${albumInfo.ID}?title=${encodeURIComponent(albumInfo.TITLE)}&type=${type}`}>
				<Image
					src={albumInfo.THUMBNAIL}
					alt={albumInfo.TITLE}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{albumInfo.TITLE}</p>
				</Link>
				<div className={style.bottomInfo}>
				<p className={style.artist}>
					<p className={style.artistName}>{albumInfo.TOTAL_NUM_TRACK} Tracks</p>
				</p>
			</div>
				{albumInfo.YN_CANCEL === 'Y' && <div className={style.bottomInfo}>
					<span className="albumBottomInfo">
							<button className="btnPaymentCancel" onClick={() => handleCancelOpen?.(albumInfo)}>CANCEL</button>
					</span>
				</div>}
		</div>
		</>
	);
};

export default AlbumItem;
