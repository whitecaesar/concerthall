"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./trackItem.module.css";
import { TRACK_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { funcTrackPlayClick } from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";

interface TrackItemProps {
	trackInfo: TRACK_ITEM_TYPE;
}

export default function TrackItem({ trackInfo }: TrackItemProps) {

	const { data, isError, isLoading } = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(trackInfo.album_id, trackInfo.ID);
			return PlayInfo;
		},
	});

	console.log(data);

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	return (
		<div className={style.trackItem}>
			<span onClick={() => funcTrackPlayClick('trackPlay',data, trackInfo)}>
				{/* Link에는 트랙 재생하는 url이 들어가야 함 */}
				<Image
					src={trackInfo.THUMBNAIL}
					alt={trackInfo.TITLE}
					width={45}
					height={45}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackInfo.TITLE}</p>
				<p className={style.artist}>{trackInfo.ARTIST?.artist_name}</p>
			</span>
			<div className={style.buttonGroup}>
				<LikeButton />
				<FuncButton method="track"/>
			</div>
		</div>
	);
}
