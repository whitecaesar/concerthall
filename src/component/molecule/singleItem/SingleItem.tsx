"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleItem.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { funcTrackPlayClick, generateClientRandomString, getCookie } from "@/services/common";
import Loading from "@/app/loading";
import Icon from "@/component/atom/icon/Icon";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SingleItem({
	singleInfo,
	trackListInfo,
	position,
	star,
	handlePaymentOpen,
	handlePopupOpen,
}: {
	singleInfo: ITEM_INFO_TYPE;
	trackListInfo: VIEWALL_LIST_TYPE;
	position: number;
	star: number;
	handlePaymentOpen: (track: ITEM_INFO_TYPE) => void;
	handlePopupOpen: (message: string) => void;
}) {
	const [popupDescription, setPopupDescription] = useState("Track not for sale.");

	const id_key = generateClientRandomString();

	const {
		data: trackData,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["TRACK-LIST", singleInfo.ID],
		queryFn: () => {
			const TrackItem = getTrackAxios(singleInfo.ID);
			return TrackItem;
		},
	});

	if (isLoading) return <Loading />;
	if (isError || !trackData)
		return <div>Error occurred</div>;

	return (
		<>
		<div className={style.singleItem} id={`${singleInfo.ID}`}>
			<span
			
				onClick={() =>
					singleInfo.YN_PURCHASED === 'Y' 
								?  funcTrackPlayClick("trackPlay", trackData.TRACK_INFO)
								: (singleInfo.YN_SALE === 'N' ? handlePopupOpen(popupDescription) : handlePaymentOpen(singleInfo))
				}
			>
				<Image
					src={singleInfo.THUMBNAIL? singleInfo.THUMBNAIL : "/images/hifiRoseLarge.png"}
					alt={singleInfo.TITLE}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{singleInfo.TITLE}</p>
			</span>
			<div className={style.bottomInfo}>
				<p className={style.artist}>
					<div className={style.artistName}>
						{singleInfo.ARTIST &&
							singleInfo.ARTIST.map((item, index) => (
								<span key={index}>
									{item.artist_name}
								</span>
							))}
					</div>
				</p>
				{( singleInfo.YN_PURCHASED === 'N' || singleInfo.YN_PURCHASED == null) ? (
				<p className={style.priceNum}
					onClick={() => handlePaymentOpen(singleInfo)}
				>
					<span>{singleInfo.PRICE}</span>
					<Icon iconName="purchasePoint" />
				</p>
				):( 
				<div className={style.buttonGroup}>
					<LikeButton
						track_info={singleInfo}
						starPoint={singleInfo.STAR || 0}
					/>
					<FuncButton
						method="trackMore"
						track_info={trackData}
						trackListInfo={trackListInfo}
						position={position}
					/>
				</div>
				)}
			</div>
		</div>
		</>
	);
}
