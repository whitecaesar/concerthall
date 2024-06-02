"use client";
import Image from "next/image";
import style from "../trackItem/trackItem.module.css";
import { funcAlbumTrackPlayClick} from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackLikeButton from "@/component/atom/button/AlbumTrackLikeButton";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";
import Link from "next/link";
interface TrackItemProps {
	ArtistTrackInfo: ALBUM_ITEM_TYPE;
	ArtistTrackList: ALBUM_ITEM_TYPE[];
}

export default function ArtistTrackItem({ ArtistTrackInfo, ArtistTrackList }: TrackItemProps) {

	const { data : trackData, isError, isLoading } = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(ArtistTrackInfo.ID);
			return TrackItem;
		},
	});


	const { data :playData, isError: playError, isLoading: playLoding } = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(ArtistTrackInfo.ID);
			return PlayInfo;
		},
	});

	if ( playLoding ) return <div>Loading...</div>;
	if ( playError || !playData ) return <div>Error occurred</div>;

	return (
		<div className={style.trackItem}>
			<span onClick={() => funcAlbumTrackPlayClick('trackPlay',playData, ArtistTrackInfo)}>
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
			<div className={style.buttonGroup}>
				<AlbumTrackLikeButton track_info={ArtistTrackInfo}/>
				<AlbumFuncButton method="albumTrackMore" track_info={trackData} play_info={playData} albumTrackList={ArtistTrackList}/>
			</div>
		</div>
	);
}
