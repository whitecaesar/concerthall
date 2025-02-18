// FuncButtonGroup.tsx
"use client";
import LikeButton from "@/component/atom/button/LikeButton";
import Button from "@/component/atom/button/Button";
import FuncButton from "@/component/atom/button/FuncButton";
import {funcPlayListPlayClick, getCookie } from "@/services/common";
import ThumbupButton from "@/component/atom/button/ThumbupButton";
import {TRACK_PLAYLIST_TYPE } from "@/services/contents/PlayListTrackAxios";
import PLFuncButton from "@/component/atom/button/PLFuncButton";
import { useEffect, useState } from "react";

interface PlayListShareInfoProps {
	trackItem: TRACK_PLAYLIST_TYPE;
	pageType?: string; // 페이지 타입 prop 추가
	like:boolean;
}
const FuncPlayListButtonGroup = ({ trackItem, pageType, like }: PlayListShareInfoProps) => {

	const [id, setId] = useState<string>('');
	const handleClick = async (Item: TRACK_PLAYLIST_TYPE) => {
		funcPlayListPlayClick('share', Item);
	};

	useEffect(() => {
		const userid = getCookie("userid");
		userid && setId(userid);
	}, []);

	return (
		<div className="FuncButtonGroup">
			{trackItem?.ownerId === id ? (
				<LikeButton starPoint={trackItem?.star} />
			) : (
				<ThumbupButton status={like} targetId={trackItem?.id}/>
			)}
			<Button
				type="button"
				icon="iconShare"
				onClick={() => handleClick(trackItem)}
			/>
			<PLFuncButton playList={trackItem}/>
			{/* 기능 로직 넣으세요. */}
			<style jsx>{`
				.FuncButtonGroup {
					display: flex;
					justify-content: space-around;
					gap: 10px;
					padding: 15px;
					border-bottom: 1px solid var(--borderDark);
					i {
						width: 20px;
						height: 20px;
					}
				}
			`}</style>
		</div>
	);
};

export default FuncPlayListButtonGroup;
