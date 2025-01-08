"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./singleItem.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { useQuery } from "@tanstack/react-query";
import { getTrackAxios } from "@/services/contents/TrackAxios";
import { getPlayInfoAxios } from "@/services/contents/PlayInfoAxios";
import { funcTrackPlayClick } from "@/services/common";
import Loading from "@/app/loading";
import Icon from "@/component/atom/icon/Icon";

export default function SingleItem({
	singleInfo,
	trackListInfo,
	position,
	star,
}: {
	singleInfo: ITEM_INFO_TYPE;
	trackListInfo: VIEWALL_LIST_TYPE;
	position: number;
	star: number;
}) {
	const {
		data: trackData,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["TRACK-LIST"],
		queryFn: () => {
			const TrackItem = getTrackAxios(singleInfo.ID);
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
			const PlayInfo = getPlayInfoAxios(singleInfo.ID);
			return PlayInfo;
		},
	});

	if (isLoading || playLoding) return <Loading />;
	if (isError || playError || !playData || !trackData)
		return <div>Error occurred</div>;

	return (
		<div className={style.singleItem} id={`${singleInfo.ID}`}>
			<span
				onClick={() =>
					funcTrackPlayClick("trackPlay", playData, trackData.TRACK_INFO)
				}
			>
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
				<p className={style.artist}>
					<div className={style.artistName}>
						{singleInfo.ARTIST &&
							singleInfo.ARTIST.map((item, index) => (
								<Link key={index} href={`/artist/${item.artist_id}`}>
									{item.artist_name}
								</Link>
							))}
					</div>
				</p>

				<p className={style.priceNum}>
					<span>2,699</span>
					<Icon iconName="purchasePoint" />
				</p>
				{/* <div className={style.buttonGroup}>
					<LikeButton
						track_info={singleInfo}
						starPoint={singleInfo.STAR || 0}
					/>
					<FuncButton
						method="trackMore"
						track_info={trackData}
						play_info={playData}
						trackListInfo={trackListInfo}
						position={position}
					/>
				</div> */}
			</div>
		</div>
	);
}
