"use client";
import Image from "next/image";
import style from "../trackItem/trackItem.module.css";
import { funcAlbumTrackPlayClick } from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackLikeButton from "@/component/atom/button/AlbumTrackLikeButton";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";
import Link from "next/link";
import Loading from "@/app/loading";
import Icon from "@/component/atom/icon/Icon";
import { useState } from "react";
import Popup from "@/component/atom/popup/Popup";
import Payment from "@/component/organism/payment/payment";

interface TrackItemProps {
	ArtistTrackInfo: ALBUM_ITEM_TYPE;
	ArtistTrackList: ALBUM_ITEM_TYPE[];
	position: number;
}

export default function ArtistTrackItem({
	ArtistTrackInfo,
	ArtistTrackList,
	position,
}: TrackItemProps) {

	console.log("ati=>", ArtistTrackInfo);

	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleConfirm = () => {
		setIsPopupOpen(false);
	};

	const handleCancel = () => {
		alert("취소 버튼 클릭!");
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
			const TrackItem = getTrackAxios(ArtistTrackInfo.ID);
			return TrackItem;
		},
	});

	const {
		data: playData,
		isError: playError,
		isLoading: playLoding,
	} = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(ArtistTrackInfo.ID);
			return PlayInfo;
		},
	});

	const handlePurchaseComplete = () => {
		refetch();
	};

	if (playLoding) return <Loading />;
	if (playError || !playData) return <div>Error occurred</div>;

	return (
		<>
		<div className={style.trackItem}>
			<span
				onClick={() =>
					ArtistTrackInfo.YN_PAYMENT === 'Y' 
					? funcAlbumTrackPlayClick("trackPlay", playData, ArtistTrackInfo)
					: (ArtistTrackInfo.YN_SALE === 'N' ? setIsPopupOpen(true) : setIsPaymentOpen(true))
				}
			>
				{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
				<Image
					src={ArtistTrackInfo.THUMBNAIL}
					alt={ArtistTrackInfo.TITLE}
					width={45}
					height={45}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{ArtistTrackInfo.TITLE}</p>
				<p className={style.artist}>
					<div className={style.artistName}>
						{ArtistTrackInfo.ARTIST?.map((item, index) => (
							<span key={index}>{item.artist_name}</span>
						))}
					</div>
				</p>
			</span>
			{/* 구매 관련 버튼튼 */}
			{(ArtistTrackInfo.YN_PAYMENT === 'N' || ArtistTrackInfo.YN_PAYMENT == null) ? (
				<div className={`${style.buttonGroup} ${style.payment}`}>
					{/* 구매 가능 버튼 */}
					{ArtistTrackInfo.YN_SALE === 'Y' ? (
					<button 
						type="button" 
						className={style.btnPayment}
						onClick={() => setIsPaymentOpen(true)}
					>
						<p className={style.priceNum}>
							<span>{ArtistTrackInfo.PRICE}</span>
							<Icon iconName="purchasePoint" />
						</p>
					</button>
					):(
						
					<button type="button" className={`${style.btnPayment} ${style.no}`}>
						<p className={style.priceNum}>구매불가</p>
					</button>
					)}
				</div>
			) : (
				<div className={style.buttonGroup}>
					<AlbumTrackLikeButton track_info={ArtistTrackInfo} />
					<AlbumFuncButton
						method="albumTrackMore"
						track_info={trackData}
						play_info={playData}
						albumTrackList={ArtistTrackList}
						position={position}
					/>
				</div>
			)}
		</div>
		<Payment 
				isOpen={isPaymentOpen}
				onClose={() => setIsPaymentOpen(false)}
				trackId={ArtistTrackInfo.ID}
				onPurchaseComplete={handlePurchaseComplete}
		/>
		<Popup
			isOpen={isPopupOpen}
			onClose={() => setIsPopupOpen(false)}
			title="안내"
			description="구매가 불가한 트랙입니다."
			buttons={[
				{ text: "확인", className: "ok", onClick: handleConfirm },
			]}
		/>
		</>
	);
}
