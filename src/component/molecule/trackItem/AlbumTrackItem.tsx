"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./trackItem.module.css";
import { funcAlbumTrackPlayClick} from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackLikeButton from "@/component/atom/button/AlbumTrackLikeButton";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import AlbumFuncButton from "@/component/atom/button/AlbumFuncButton";
interface TrackItemProps {
	albumTrackInfo: ALBUM_ITEM_TYPE;
	AlbumTrackList: ALBUM_ITEM_TYPE[];
}

export default function AlbumTrackItem({ albumTrackInfo, AlbumTrackList }: TrackItemProps) {
	const { data : trackData, isError, isLoading } = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(albumTrackInfo.ID);
			return TrackItem;
		},
	});
	
	const { data :playData, isError: playError, isLoading: playLoding } = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(albumTrackInfo.ID);
			return PlayInfo;
		},
	});

	if (isLoading || playLoding ) return <div>Loading...</div>;
	if (isError || playError || !playData || !trackData) return <div>Error occurred</div>;

	return (
		<div className={style.trackItem}>
			<span onClick={() => funcAlbumTrackPlayClick('trackPlay',playData, albumTrackInfo)}>
				<span>
				{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
				<Image
					src={albumTrackInfo.THUMBNAIL}
					alt={albumTrackInfo.TITLE}
					width={45}
					height={45}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{albumTrackInfo.TITLE}</p>
				</span>
				{albumTrackInfo.ARTIST?.map((item, index) => (
				<Link key={index} href={`/artist/${item.artist_id}`}><p className={style.artist}>{item.artist_name}</p></Link>
				))}				
			</span>
			<div className={style.buttonGroup}>
				<AlbumTrackLikeButton track_info={albumTrackInfo}/>
				<AlbumFuncButton method="albumTrackMore" track_info={trackData} play_info={playData} albumTrackList={AlbumTrackList}/>
			</div>
		</div>
	);
}
