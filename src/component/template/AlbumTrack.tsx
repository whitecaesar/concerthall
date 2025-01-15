"use client";
import { useQuery } from "@tanstack/react-query";
import { getAlbumAxios } from "@/services/contents/AlbumAxios";
import DetailInfo from "../molecule/detailInfo/DetailInfo";
import FuncButtonGroup from "../molecule/buttonGroup/FuncButtonGroup";
import TrackList from "@/component/organism/trackList/TrackList";
import AlbumTrackList from "../organism/trackList/AlbumTrackList";
import Loading from "@/app/loading";
import PriceArea from "../molecule/priceGroup/priceArea";

interface AlbumTrackProps {
	album_id: string;
	func_type?: string;
}

export default function AlbumTrack({ album_id, func_type }: AlbumTrackProps) {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정

	const { data, isError, isLoading } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: async () => {
			const trackList = await getAlbumAxios(album_id);
			
			// ITEM_INFO의 모든 트랙의 YN_SALE 값을 확인
			console.log("trackList : ", trackList);
			const hasUnavailableTrack = trackList.ITME_INFO.some(
				(track: any) => track.YN_SALE === 'N'
			);
			
			// 전체 앨범의 YN_SALE 값 설정
			return {
				...trackList,
				YN_PAYMENT: hasUnavailableTrack ? 'N' : 'Y'
			};
		},
	});

	if (isLoading) return <Loading />;
	if (isError || !data) return <div>Error occurred</div>;

	console.log("DATA : ", data);
	// data가 non-null임을 보장하기 위한 optional chaining
	const trackItem = data.ITME_INFO; // 예시로 첫 번째 아이템 사용


	if (data) {
		return (
			<>
				<DetailInfo detailInfo={data} />
				{data.YN_PAYMENT === 'Y' ? (
					<FuncButtonGroup AlbumItem={data} />
				) : (
					<PriceArea />
				)}
				{trackItem && <AlbumTrackList AlbumTrackList={trackItem} />}
			</>
		);
	} else {
		return <div>Error occurred</div>;
	}
}
