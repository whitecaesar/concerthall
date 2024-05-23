// 아티스트를 클릭했을 때 나오는 아티스트 트랙들
"use client";
import { useQuery } from "@tanstack/react-query";
import { getAlbumAxios } from "@/services/contents/AlbumAxios";
import FuncButtonGroup from "../molecule/buttonGroup/FuncButtonGroup";
import ArtistDetailInfo from "../molecule/artistDetailInfo/ArtistDetailInfo";
import ArtistTrackList from "../organism/ArtistTrackList/ArtistTrackList";
import ArtistAbout from "../molecule/artistAbout/ArtistAbout";
import ArtistList from "../organism/artistList/ArtistList";
import AlbumList from "../organism/albumList/AlbumList";
import ArtistPage from "@/app/artist/page";

interface AlbumTrackProps {
	album_id: string;
}

export default function AlbumTrack(album: AlbumTrackProps) {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정

	const { data, isError, isLoading } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: () => {
			const TrackList = getAlbumAxios(album.album_id);
			return TrackList;
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	// data가 non-null임을 보장하기 위한 optional chaining
	const AlbumItem = data?.LIST[0]; // 예시로 첫 번째 아이템 사용
	if (!AlbumItem) return <div>No data available</div>;

	return (
		<>
			<ArtistDetailInfo detailInfo={AlbumItem} />
			<FuncButtonGroup pageType={ArtistPage} AlbumItem={AlbumItem} />
			{/* 선택한 아티스트 Top Tracks */}
			<ArtistTrackList trackList={AlbumItem} />
			{/* 아티스트의 앨범들이 들어감 */}
			<AlbumList showTitle={true} recommendList={AlbumItem} />
			{/* 관련 아티스트들 리스트 */}
			<ArtistList artistList={AlbumItem} />
			{/* 선택한 아티스트의 텍스트 정보 */}
			<ArtistAbout artistInfo={AlbumItem} />
		</>
	);
}
