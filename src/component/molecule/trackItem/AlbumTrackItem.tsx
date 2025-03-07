"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./trackItem.module.css";
import { funcAlbumTrackPlayClick, generateClientRandomString } from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackLikeButton from "@/component/atom/button/AlbumTrackLikeButton";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";
import Loading from "@/app/loading";
import Icon from "@/component_RS/button/icon/Icon";
import Payment from "@/component/organism/payment/payment";
import { useState } from "react";
import Popup from "@/component/atom/popup/Popup";

interface TrackItemProps {
	albumTrackInfo: ALBUM_ITEM_TYPE;
	AlbumTrackList: ALBUM_ITEM_TYPE[];
	position: number;
	type?: string;
}

export default function AlbumTrackItem({
	albumTrackInfo,
	AlbumTrackList,
	position,
	type,
}: TrackItemProps) {
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupDescription, setPopupDescription] =
		useState("구매가 불가한 트랙입니다.");
		
	const id_key = generateClientRandomString();
	
	const handleConfirm = () => {
		setIsPopupOpen(false);
	};

	const handleCancel = () => {
		setIsPopupOpen(false);
	};

	const {
		data: trackData,
		isError,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(albumTrackInfo.ID);
			return TrackItem;
		},
	});

	const handlePurchaseComplete = () => {
		refetch();
	};

	const handleError = (message: string) => {
		setPopupDescription(message);
		setIsPopupOpen(true);
	};

	if (isLoading) return <Loading />;
	if (isError || !trackData)return <div>Error occurred</div>;

	return (
		<>
			<div className={style.trackItem}>
				<span className={style.albumTrackInfoWrap}>
					<span
						className={style.albumTrackInfo}
						onClick={() =>
							albumTrackInfo.YN_PURCHASED === "Y"
								? funcAlbumTrackPlayClick("trackPlay", albumTrackInfo)
								: albumTrackInfo.YN_SALE === "N"
								? setIsPopupOpen(true)
								: setIsPaymentOpen(true)
						}
					>
						{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
						<Image
							src={albumTrackInfo.THUMBNAIL}
							alt={albumTrackInfo.TITLE}
							width={45}
							height={45}
							priority={true}
							className={style.thumbnail}
						/>
						<p className={style.title}>{albumTrackInfo.TITLE}</p>
					</span>
					<div className={style.albumArtistInfo}>
						{albumTrackInfo.ARTIST?.map((item, index) => (
							<Link key={index} href={`/artist/${item.artist_id}`}>
								<p className={style.artist}>{item.artist_name}</p>
							</Link>
						))}
					</div>
				</span>
				{albumTrackInfo.YN_CANCEL == "Y" && (<button className={style.btnPaymentCancel}>CANCEL</button>)}
				{/* 구매 관련 버튼 */}
				{albumTrackInfo.YN_PURCHASED == "N" || albumTrackInfo.YN_PURCHASED == null ? (
					<div className={`${style.buttonGroup} ${style.payment}`}>
						{/* 구매 가능 버튼 */}
						{albumTrackInfo.YN_SALE == "Y" ? (
							<button
								type="button"
								className={style.btnPayment}
								onClick={() => setIsPaymentOpen(true)}
							>
								<p className={style.priceNum}>
									<span>{albumTrackInfo.PRICE}</span>
									<Icon iconName="purchasePoint" />
								</p>
							</button>
						) : (
							<button
								type="button"
								className={`${style.btnPayment} ${style.no}`}
							>
								<p className={style.priceNum}>Not for sale</p>
							</button>
						)}
					</div>
				) : (
					<div className={style.buttonGroup}>
						<AlbumTrackLikeButton track_info={albumTrackInfo} />
						<AlbumFuncButton
							method="albumTrackMore"
							track_info={trackData}
							albumTrackList={AlbumTrackList}
							position={position}
						/>
					</div>
				)}
			</div>

			<Payment
				isOpen={isPaymentOpen}
				onClose={() => setIsPaymentOpen(false)}
				trackId={albumTrackInfo.ID}
				price={albumTrackInfo.PRICE}
				idKey={id_key}
				type="track"
				onPurchaseComplete={handlePurchaseComplete}
				onError={handleError}
			/>
			<Popup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="INFOMATION"
				description={popupDescription}
				buttons={[{ text: "OK", className: "ok", onClick: handleConfirm }]}
			/>
		</>
	);
}
