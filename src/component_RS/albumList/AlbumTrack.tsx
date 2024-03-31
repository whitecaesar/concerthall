"use client";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import TrackList from "./TrackList";

export default function AlbumTrack() {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	const { data, isError, isLoading } = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackList = getTrackAxios();
			return TrackList;
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	return <>{data?.LIST && <TrackList trackList={data.LIST} />}</>;
}
