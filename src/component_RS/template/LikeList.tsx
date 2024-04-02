"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import TrackList from "../trackList/TrackList";

export default function LikeList() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});

	const trackItem = data?.RECOMMEND_LIST[1];

	return (
		<>{trackItem && <TrackList isTitle={false} recommendList={trackItem} />}</>
	);
}
