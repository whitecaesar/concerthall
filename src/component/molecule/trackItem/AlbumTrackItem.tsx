"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./trackItem.module.css";
import { funcAlbumTrackPlayClick, generateClientRandomString, getCookie } from "@/services/common";
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
import { purchaseTexts } from "@/component/organism/menuList/MenuList";
import { useRouter } from "next/navigation";
import { setCancelAxios, setCitechCancelAxios } from "@/services/contents/PurchaseCancelAxios";

interface TrackItemProps {
	albumTrackInfo: ALBUM_ITEM_TYPE;
	AlbumTrackList: ALBUM_ITEM_TYPE[];
	position: number;
	type?: string;
	handlePaymentOpen?: (track: ALBUM_ITEM_TYPE) => void;
	handlePopupOpen?: (message: string) => void;
	handleCancelOpen?: (track: ALBUM_ITEM_TYPE) => void;
}

export default function AlbumTrackItem({
	albumTrackInfo,
	AlbumTrackList,
	position,
	type,
	handlePaymentOpen,
	handlePopupOpen,
	handleCancelOpen
}: TrackItemProps) {
	
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

	const handleTrackClick = () => {
		console.log("albumTrackInfo", albumTrackInfo);
		if (albumTrackInfo.YN_PURCHASED === "Y") {
			// 구매한 트랙은 재생
			funcAlbumTrackPlayClick("trackPlay", albumTrackInfo);
			// 여기에 화면 리로드
			if(albumTrackInfo.YN_CANCEL === "Y") {
				window.location.reload();
			}
		} else if (albumTrackInfo.YN_SALE === "N") {
			// 판매불가 트랙은 팝업 표시
			if (handlePopupOpen) {
				handlePopupOpen("구매 불가능 트랙입니다.");
			}
		} else {
			// 구매 가능한 트랙은 결제창 표시
			if (handlePaymentOpen) {
				handlePaymentOpen(albumTrackInfo);
			}
		}
	};

	if (isLoading) return <Loading />;
	if (isError || !trackData) return <div>Error occurred</div>;

	return (
		<>
			<div className={style.trackItem}>
				<span className={style.albumTrackInfoWrap} onClick={handleTrackClick}>
					<span
						className={style.albumTrackInfo}
					>
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
							<span key={index}>
								<p className={style.artist}>{item.artist_name}</p>
							</span>
						))}
					</div>
				</span>
				{albumTrackInfo.YN_CANCEL === "Y" && (
					<button 
						className={style.btnPaymentCancel} 
						onClick={() => handleCancelOpen && handleCancelOpen(albumTrackInfo)}
					>
						CANCEL
					</button>
				)}
				{/* 구매 관련 버튼 */}
				{(albumTrackInfo.YN_PURCHASED === "N" || albumTrackInfo.YN_PURCHASED === null) && type !== 'purchase' ? (
					<div className={`${style.buttonGroup} ${style.payment}`}>
						{/* 구매 가능 버튼 */}
						{albumTrackInfo.YN_SALE === "Y" ? (
							<button
								type="button"
								className={style.btnPayment}
								onClick={() => handlePaymentOpen && handlePaymentOpen(albumTrackInfo)}
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
		</>
	);
}
