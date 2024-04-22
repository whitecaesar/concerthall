"use client";
import { useQuery } from "@tanstack/react-query";
import { TRACK_LIST_RESPONSE, getTrackAxios } from "@/services/contents/AlbumAxios";
import DetailInfo from "../molecule/detailInfo/DetailInfo";
import FuncButtonGroup from "../molecule/buttonGroup/FuncButtonGroup";
import TrackList from "@/component/organism/trackList/TrackList";

interface AlbumTrackProps {
	album_id: string;
}

export default function AlbumTrack(album : AlbumTrackProps) {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정

	const { data, isError, isLoading } = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackList = getTrackAxios(album.album_id);
			return TrackList;
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	// data가 non-null임을 보장하기 위한 optional chaining
	const AlbumItem = data?.LIST[0]; // 예시로 첫 번째 아이템 사용

	//console.log(AlbumItem);

	return (
		<>
			<DetailInfo detailInfo={AlbumItem} />
			<FuncButtonGroup />
			{AlbumItem && <TrackList trackList={AlbumItem} />}
		</>
	);

}
