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
import { funcTrackPlayClick, generateClientRandomString } from "@/services/common";
import Loading from "@/app/loading";
import Icon from "@/component/atom/icon/Icon";
import { useState } from "react";
import Payment from "@/component/organism/payment/payment";
import Popup from "@/component/atom/popup/Popup";

export default function SingleItem({
	singleInfo,
	trackListInfo,
	position,
	star,
}: {
	singleInfo: ITEM_INFO_TYPE;
	trackListInfo: VIEWALL_LIST_TYPE;
	position: number;
	star: number;
}) {

	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupDescription, setPopupDescription] =
		useState("Track not for sale.");

	const id_key = generateClientRandomString();

	const handleConfirm = () => {
		setIsPopupOpen(false);
	};

	const {
		data: trackData,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(singleInfo.ID);
			return TrackItem;
		},
	});

	const handlePurchaseComplete = () => {
	///	refetch();
	};

	const handleError = (message: string) => {
		setPopupDescription(message);
		setIsPopupOpen(true);
	};

	if (isLoading) return <Loading />;
	if (isError || !trackData)
		return <div>Error occurred</div>;

	return (
		<>
		<div className={style.singleItem} id={`${singleInfo.ID}`}>
			<span
				onClick={() =>
					
					singleInfo.YN_PURCHASED === 'Y' 
								? funcTrackPlayClick("trackPlay", trackData.TRACK_INFO)
								: (singleInfo.YN_SALE === 'N' ? setIsPopupOpen(true) : setIsPaymentOpen(true))
				}
			>
				<Image
					src={singleInfo.THUMBNAIL}
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
								<Link key={index} href={`/artist/${item.artist_id}`}>
									{item.artist_name}
								</Link>
							))}
					</div>
				</p>
				{( singleInfo.YN_PURCHASED === 'N' || singleInfo.YN_PURCHASED == null) ? (
				<p className={style.priceNum}
					onClick={() => setIsPaymentOpen(true)}
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
		<Payment 
				isOpen={isPaymentOpen}
				onClose={() => setIsPaymentOpen(false)}
				trackId={singleInfo.ID}
				price={singleInfo.PRICE}
				idKey={id_key}
				type="track"
				onPurchaseComplete={handlePurchaseComplete}
				onError={handleError}
		/>
		<Popup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="INFORMATION"
				description={popupDescription}
				buttons={[{ text: "OK", className: "ok", onClick: handleConfirm }]}
			/>
		</>
	);
}
