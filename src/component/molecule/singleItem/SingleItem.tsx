"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleItem.module.css";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { funcTrackPlayClick } from "@/services/common";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";


export default function SingleItem({
	singleInfo,
}: {
	singleInfo: ITEM_INFO_TYPE;
}) {

	const { data, isError, isLoading } = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(singleInfo.ID);
			return TrackItem;
		},
	});
	
	const { data :TarckData, isError: TrackError, isLoading: trackLoding } = useQuery({
		queryKey: ["PLAY-INFO"],
		queryFn: () => {
			const PlayInfo = getPlayInfoAxios(singleInfo.ID);
			return PlayInfo;
		},
	});

	if (isLoading || trackLoding ) return <div>Loading...</div>;
	if (isError || TrackError || !TarckData || !data) return <div>Error occurred</div>;

	return (
		<div className={style.singleItem} id={`${singleInfo.ID}`}>
			<span onClick={() => funcTrackPlayClick('trackPlay',TarckData, data.TRACK_INFO)}>
				<Image
					src={singleInfo.THUMBNAIL}
					alt={singleInfo.TITLE}
					width={150}
					height={85}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{singleInfo.TITLE}</p>
			</span>
			<div className={style.bottomInfo}>
				<p className={style.artist}>{singleInfo.ARTIST?.artist_name}</p>
				<div className={style.buttonGroup}>
					<LikeButton star={0} />
					<FuncButton method="trackMore" track_info={data} play_info={TarckData}/>
					{/* 기능 로직 넣으세요. */}
				</div>
			</div>
		</div>
	);
}
