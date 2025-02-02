"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./trackItem.module.css";
import { funcAlbumTrackPlayClick } from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
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
}

export default function AlbumTrackItem({
	albumTrackInfo,
	AlbumTrackList,
	position,
}: TrackItemProps) {
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("구매가 불가한 트랙입니다.");

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
			const TrackItem = getTrackAxios(albumTrackInfo.ID);
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
			const PlayInfo = getPlayInfoAxios(albumTrackInfo.ID);
			return PlayInfo;
		},
	});

	const handlePurchaseComplete = () => {
		refetch();
	};

	const handleError = (message: string) => {
		setPopupDescription(message);
		setIsPopupOpen(true);
	};

	if (isLoading || playLoding) return <Loading />;
	if (isError || playError || !playData || !trackData)
		return <div>Error occurred</div>;
 
	return (
		<>
			<div className={style.trackItem}>
				<span className={style.albumTrackInfoWrap}>
					<span
						className={style.albumTrackInfo}
						onClick={() => 
							albumTrackInfo.YN_PAYMENT === 'Y' 
								? funcAlbumTrackPlayClick("trackPlay", playData, albumTrackInfo)
								: (albumTrackInfo.YN_SALE === 'N' ? setIsPopupOpen(true) : setIsPaymentOpen(true))
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
				{/* 구매 관련 버튼튼 */}
				{albumTrackInfo.YN_PAYMENT === 'N' || albumTrackInfo.YN_PAYMENT == null ? (
				<div className={`${style.buttonGroup} ${style.payment}`}>
					{/* 구매 가능 버튼 */}
					{albumTrackInfo.YN_SALE === 'Y' ? (
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
					):(
						
					<button type="button" className={`${style.btnPayment} ${style.no}`}>
						<p className={style.priceNum}>구매불가</p>
					</button>
					)}
				</div>
				) : (
				<div className={style.buttonGroup}>
					<AlbumTrackLikeButton track_info={albumTrackInfo} />
					<AlbumFuncButton
						method="albumTrackMore"
						track_info={trackData}
						play_info={playData}
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
				price={2000}
				onPurchaseComplete={handlePurchaseComplete}
				onError={handleError}
			/>
			<Popup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="안내"
				description={popupDescription}
				buttons={[
					{ text: "확인", className: "ok", onClick: handleConfirm },
				]}
			/>
		</>
	);
}
