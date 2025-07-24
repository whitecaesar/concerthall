"use client";
import Image from "next/image";
import style from "./trackItem.module.css";
import { funcAlbumTrackPlayClick} from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackLikeButton from "@/component/atom/button/AlbumTrackLikeButton";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";
import Loading from "@/app/loading";
import Icon from "@/component_RS/button/icon/Icon";
import { useState } from "react";
import { usePathname } from "next/navigation";

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

	const [isCancelVisible, setIsCancelVisible] = useState("Y"); 
	const pathname = usePathname();
	const isPurchaseListPage = pathname === "/my/purchaseList";
	
	const {
		data: trackData,
		isError,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["TRACK-LIST", albumTrackInfo.ID],
		queryFn: () => {
			const TrackItem = getTrackAxios(albumTrackInfo.ID);
			return TrackItem;
		},
	});

	const handleTrackClick = async () => {
		console.log("albumTrackInfo", albumTrackInfo);
		if (albumTrackInfo.YN_PURCHASED === "Y") {
			// 구매한 트랙은 재생
			await funcAlbumTrackPlayClick("trackPlay", albumTrackInfo);
			// 여기에 화면 CANCEL 버튼이 안보이게 처리 
			setIsCancelVisible("N");
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
							src={albumTrackInfo.THUMBNAIL || "/images/hifiRoseSmall.png"}
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
				{albumTrackInfo.YN_CANCEL === "Y" && isCancelVisible === "Y" ? (
					<button 
						className={style.btnPaymentCancel} 
						onClick={() => handleCancelOpen && handleCancelOpen(albumTrackInfo)}
					>
						CANCEL
					</button>
				) : (
					isPurchaseListPage && (
						<div className={style.priceWrapper}>
							<span>{albumTrackInfo.PRICE}</span>
							<Icon iconName="purchasePoint" />
						</div>
					)
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
