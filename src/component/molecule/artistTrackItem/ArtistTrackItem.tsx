"use client";
import Image from "next/image";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./artistTrackItem.module.css";
import { TRACK_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { funcTrackPlayClick } from "@/services/common";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { getTrackAxios } from "@/services/contents/TrackAxios";

interface ArtistTrackItemProps {
	trackInfo: TRACK_ITEM_TYPE;
}

export default function ArtistTrackItem({ trackInfo }: ArtistTrackItemProps) {
	const {
		data: trackData,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(trackInfo.ID);
			return TrackItem;
		},
	});

	const {
		data: playData,
		isError: playError,
		isLoading: playLoding,
	} = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(trackInfo.ID);
			return PlayInfo;
		},
	});

	if (isLoading || playLoding) return <div>Loading...</div>;
	if (isError || playError || !playData || !trackData)
		return <div>Error occurred</div>;

	return (
		<div className={style.artistTrackItem}>
			<span
				onClick={() => funcTrackPlayClick("trackPlay", playData, trackInfo)}
			>
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
				<LikeButton starPoint={0} />
				<FuncButton
					method="trackMore"
					track_info={trackData}
					play_info={playData}
				/>
			</div>
		</div>
	);
}
