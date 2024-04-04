"use client";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import TrackList from "../trackList/TrackList";

export default function AlbumTrack() {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	const { data, isError, isLoading } = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: getBannersAxios,
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	const trackItem = data?.RECOMMEND_LIST[1];

	return (
		<>
			<TrackList recommendList={trackItem} isTitle={false} />
		</>
	);
}
