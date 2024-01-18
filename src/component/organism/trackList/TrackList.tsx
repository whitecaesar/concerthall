"use client";
import React from "react";
import { ItemInfoType } from "@/interface/itemInfoType";
import itemData from "@/data/iteminfo.json";
import TrackItem from "@/component/molecule/trackItem/TrackItem";

interface TrackListProps {
	trackItemCount?: number; // 트랙개수를 위한 prop
}

export default function TrackList({
	trackItemCount = itemData.length, // 기본값으로 itemData의 길이
}: TrackListProps) {
	return (
		<>
			<div className="trackListWrap">
				<div className="trackNum">
					<span>{trackItemCount} Tracks</span>
				</div>
				<ul className="trackList">
					{itemData.map((item: ItemInfoType) => (
						<li key={item.id}>
							<TrackItem trackInfo={item} />
						</li>
					))}
				</ul>
			</div>
			<style jsx>{`
				.trackListWrap {
					margin-top: 10px;
					.trackNum {
						padding: 10px 15px;
						font-size: 13px;
					}
				}
			`}</style>
		</>
	);
}
