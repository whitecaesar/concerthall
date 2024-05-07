"use client";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/component/atom/button/LikeButton";
import FuncButton from "@/component/atom/button/FuncButton";
import style from "./AlbumItem.module.css";
import {PLAY_RECENT_ITEM_TYPE} from "@/services/contents/RecentPlayListAxios";
import Icon from "@/component_RS/button/icon/Icon";

interface PlayListItemProps {
	playListInfo: PLAY_RECENT_ITEM_TYPE;
	onClick?: () => void;
}

const RecentPlayListItem = ({ playListInfo, onClick }: PlayListItemProps) => {
	return (
		<div className={style.albumItem} onClick={onClick}>
			<Link href={`/detail/album/track/${playListInfo.id}`}>
				<Image
					src={playListInfo.thumbnail}
					alt={playListInfo.title}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				<p className={style.title}>{playListInfo.title}</p>
				<div className={style.bottomInfo}>
					<span className={style.thumbupCnt}>
						<Icon iconName="thumbUp" /> {playListInfo.star}
					</span>
					<span className={style.bar}></span>
					<span>12곡</span>
				</div>
			</Link>
		</div>
	);
}

export default RecentPlayListItem;
