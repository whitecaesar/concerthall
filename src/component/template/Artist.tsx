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
import ArtistPage from "@/app/artist/[id]/page";
import { getArtistInfoAxios } from "@/services/contents/ArtistInfoAxios";
import ArtistAlbumList from "../organism/albumList/ArtistAlbumList";

interface ArtistInfoProps {
	artist_id: string;
}

export default function ArtistInfo(artist: ArtistInfoProps) {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정

	const { data, isError, isLoading } = useQuery({
		queryKey: ["ARTIST-ITEM"],
		queryFn: () => {
			const ArtistInfo = getArtistInfoAxios(artist.artist_id);
			return ArtistInfo;
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	return (
		<>
			{data.ARTIST_INFO && <ArtistDetailInfo detailInfo={data.ARTIST_INFO} />}
						{/*<FuncButtonGroup AlbumItem={data}/>*/}
			{data.ARTIST_TRACK_INFO && <ArtistTrackList ArtistTrackList={data.ARTIST_TRACK_INFO} />}
			{data && <ArtistAlbumList showTitle={true} recommendList={data} />}
			{data.ARTIST_INFO.DESC_ARTIST && <ArtistAbout artist_desc={data.ARTIST_INFO.DESC_ARTIST}/>}
			{/*FuncButtonGroup pageType={ArtistPage} AlbumItem={AlbumItem} />
			<AlbumList showTitle={true} recommendList={AlbumItem} />
			*/}
		</>
	);
}
