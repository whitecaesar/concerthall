"use client";
import { useQuery } from "@tanstack/react-query";
import { getAlbumAxios } from "@/services/contents/AlbumAxios";
import DetailInfo from "../molecule/detailInfo/DetailInfo";
import FuncButtonGroup from "../molecule/buttonGroup/FuncButtonGroup";
import TrackList from "@/component/organism/trackList/TrackList";
import AlbumTrackList from "../organism/trackList/AlbumTrackList";
import Loading from "@/app/loading";

interface AlbumTrackProps {
	album_id: string;
	func_type?: string;
}

export default function AlbumTrack({ album_id, func_type }: AlbumTrackProps) {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정

	const { data, isError, isLoading } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: () => {
			const TrackList = getAlbumAxios(album_id);
			return TrackList;
		},
	});

	if (isLoading) return <Loading />;
	if (isError || !data) return <div>Error occurred</div>;

	// data가 non-null임을 보장하기 위한 optional chaining
	const trackItem = data.ITME_INFO; // 예시로 첫 번째 아이템 사용

	if (data) {
		return (
			<>
				<DetailInfo detailInfo={data} />
				<FuncButtonGroup AlbumItem={data} />
				{trackItem && <AlbumTrackList AlbumTrackList={trackItem} />}
			</>
		);
	} else {
		return <div>Error occurred</div>;
	}
}
