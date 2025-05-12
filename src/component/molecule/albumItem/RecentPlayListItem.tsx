"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./albumItem.module.css";
import {PLAY_RECENT_ITEM_TYPE} from "@/services/contents/RecentPlayListAxios";
import Icon from "@/component_RS/button/icon/Icon";

interface PlayListItemProps {
	playListInfo: PLAY_RECENT_ITEM_TYPE;
	onClick?: () => void;
}

const RecentPlayListItem = ({ playListInfo, onClick }: PlayListItemProps) => {
	return (
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/playList/track/${playListInfo.id}?size=${playListInfo.trackCount}&title=${playListInfo.title}`}>
				<Image
					src={playListInfo.thumbnail || "/images/imgPaylist.png"}
					alt={playListInfo.title}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{playListInfo.title}</p>
				<div className={style.bottomInfo}>
					<span className={style.thumbupCnt}>
						<Icon iconName="thumbUp" /> {playListInfo.thumbupCount}
					</span>
					<span className={style.bar}></span>
					<span>{playListInfo.trackCount}</span>
				</div>
			</Link>
		</div>
	);
}

export default RecentPlayListItem;
