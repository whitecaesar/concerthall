import React from "react";
import TrackList from "@/component/organism/trackList/TrackList";
import FuncButtonGroup from "../molecule/buttonGroup/FuncButtonGroup";
import DetailInfo from "../molecule/detailInfo/DetailInfo";
import itemData from "@/data/iteminfo.json";

export default function AlbumDetail() {
	// 임시 데이터, 실제 데이터로 대체 필요
	const firstItem = itemData[0];
	return (
		<>
			<DetailInfo detailInfo={firstItem} />
			<FuncButtonGroup />
			<TrackList />
		</>
	);
}
