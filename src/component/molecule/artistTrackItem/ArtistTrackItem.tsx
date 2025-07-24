"use client";
import Image from "next/image";
import style from "../trackItem/trackItem.module.css";
import { funcAlbumTrackPlayClick} from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackLikeButton from "@/component/atom/button/AlbumTrackLikeButton";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";
import Loading from "@/app/loading";
import Icon from "@/component/atom/icon/Icon";

interface TrackItemProps {
	ArtistTrackInfo: ALBUM_ITEM_TYPE;
	ArtistTrackList: ALBUM_ITEM_TYPE[];
	position: number;
	handlePaymentOpen: (track: ALBUM_ITEM_TYPE) => void;
	handlePopupOpen: (message: string) => void;
}

export default function ArtistTrackItem({
	ArtistTrackInfo,
	ArtistTrackList,
	position,
	handlePaymentOpen,
	handlePopupOpen,
}: TrackItemProps) {
	
	const {
		data: trackData,
		isError,
		isLoading
	} = useQuery({
		queryKey: ["TRACK-LIST", ArtistTrackInfo.ID],
		queryFn: () => {
			const TrackItem = getTrackAxios(ArtistTrackInfo.ID);
			return TrackItem;
		},
	});

	if (isLoading) return <Loading />;
	if (isError || !trackData) return <div>Error occurred</div>;

	return (
		<>
		<div className={style.trackItem}>
			<span
				onClick={() =>
					ArtistTrackInfo.YN_PURCHASED === 'Y' 
					? funcAlbumTrackPlayClick("trackPlay", ArtistTrackInfo)
					: (ArtistTrackInfo.YN_SALE === 'N' ? handlePopupOpen("구매가 불가한 트랙입니다.") : handlePaymentOpen(ArtistTrackInfo))
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
			{(ArtistTrackInfo.YN_PURCHASED === 'N' || ArtistTrackInfo.YN_PURCHASED == null) ? (
				<div className={`${style.buttonGroup} ${style.payment}`}>
					{/* 구매 가능 버튼 */}
					{ArtistTrackInfo.YN_SALE === 'Y' ? (
					<button 
						type="button" 
						className={style.btnPayment}
						onClick={() => handlePaymentOpen(ArtistTrackInfo)}
					>
						<p className={style.priceNum}>
							<span>{ArtistTrackInfo.PRICE}</span>
							<Icon iconName="purchasePoint" />
						</p>
					</button>
					):(
						
					<button type="button" className={`${style.btnPayment} ${style.no}`}>
						<p className={style.priceNum}>Not for Sale</p>
					</button>
					)}
				</div>
			) : (
				<div className={style.buttonGroup}>
					<AlbumTrackLikeButton track_info={ArtistTrackInfo} />
					<AlbumFuncButton
						method="albumTrackMore"
						track_info={trackData}
						albumTrackList={ArtistTrackList}
						position={position}
					/>
				</div>
			)}
		</div>
		</>
	);
}
