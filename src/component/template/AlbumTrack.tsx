"use client";
import { useQuery } from "@tanstack/react-query";
import { getAlbumAxios } from "@/services/contents/AlbumAxios";
import DetailInfo from "../molecule/detailInfo/DetailInfo";
import FuncButtonGroup from "../molecule/buttonGroup/FuncButtonGroup";
import AlbumTrackList from "../organism/trackList/AlbumTrackList";
import Loading from "@/app/loading";
import PriceArea from "../molecule/priceGroup/priceArea";
import { getStarTrackListAxios, STAR_TRACK_LIST_RESPONSE_TYPE } from "@/services/contents/StarAxios";

interface AlbumTrackProps {
	album_id: string;
	func_type?: string;
}

export default function AlbumTrack({ album_id, func_type}: AlbumTrackProps) {

	const { data, isError, isLoading } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: async () => {
			const trackList = await getAlbumAxios(album_id);

			// ITEM_INFO의 모든 트랙의 YN_SALE 값을 확인
			const hasPaymentTrack = trackList.ITEM_INFO.some(
				(track: any) => track.YN_PURCHASED === 'N' || track.YN_PURCHASED == null
			);

			const hasUnavailableTrack = trackList.ITEM_INFO.some(
				(track: any) => track.YN_SALE === 'N' || track.YN_SALE == null
			);

			 // YN_SALE이 'Y'인 트랙의 PRICE 합산
			 const totalAlbumPrice = trackList.ITEM_INFO
			 .filter((track: any) => track.YN_PURCHASED === 'N' && track.YN_SALE === 'Y')
			 .reduce((total: number, track: any) => total + (track.PRICE || 0), 0);
			
			// 전체 앨범의 YN_SALE 값 설정
			return {
				...trackList,
				YN_PURCHASED: hasPaymentTrack ? 'N' : 'Y',
				YN_SALE: hasUnavailableTrack ? 'N' : 'Y',
				ALBUM_PRICE: totalAlbumPrice
			};
		},
	});

	if (isLoading) return <Loading />;
	if (isError || !data) return <div>Error occurred</div>;

	// data가 non-null임을 보장하기 위한 optional chaining
	const trackItem = data.ITEM_INFO; // 예시로 첫 번째 아이템 사용

	if (data) {
		return (
			<>
			
				<DetailInfo detailInfo={data} />

				{ data.YN_PURCHASED === 'Y' ? (
					<FuncButtonGroup AlbumItem={data} />
				) : (
					<PriceArea AlbumItem={data}/>
				)}

				{trackItem && <AlbumTrackList AlbumTrackList={trackItem}/>}
			
			</>
		);
	} else {
		return <div>Error occurred</div>;
	}
}
