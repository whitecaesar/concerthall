"use client";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import TrackList from "../trackList/TrackList";

export default function LikeList() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});

	const { setSubTitle } = useContext(SubTitleContext);
	useEffect(() => {
		setSubTitle("즐겨찾기");
	}, []);

	const trackItem = data?.RECOMMEND_LIST[1];

	return <>{trackItem && <TrackList recommendList={trackItem} />}</>;
}
