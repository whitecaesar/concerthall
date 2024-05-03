"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleItem.module.css";
import { TRACK_RECENT_ITEM_TYPE } from "@/services/contents/RecentTrackListAxios";
import { useQuery } from "@tanstack/react-query";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { funcRecentTrackPlayClick } from "@/services/common";



export default function RecentTrackListItem({
	trackListInfo,
}: {
	trackListInfo: TRACK_RECENT_ITEM_TYPE;
}) {

    const { data :playData, isError: playError, isLoading: playLoding } = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(trackListInfo.id);
			return PlayInfo;
		},
	});

    if (playLoding ) return <div>Loading...</div>;
	if (playError || !playData) return <div>Error occurred</div>;

    
	return (
		<div className={style.singleItem} id={`${trackListInfo.id}`}>
			<span onClick={() => funcRecentTrackPlayClick('recentTrackPlay',playData, trackListInfo)}>
				<Image
					src={trackListInfo.thumbnailUrl}
					alt={trackListInfo.title}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{trackListInfo.title}</p>
			</span>
			<div className={style.bottomInfo}>
				<p className={style.artist}></p>
				<div className={style.buttonGroup}>
					<LikeButton starPoint={0}/>
					<FuncButton method="recentTrackMore" recent_track_info={trackListInfo} play_info={playData} />
					{/* 기능 로직 넣으세요. */}
				</div>
			</div>
		</div>
	);
}
