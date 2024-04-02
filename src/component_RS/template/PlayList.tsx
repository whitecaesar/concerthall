"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import AlbumList from "../albumList/AlbumList";

export default function PlayList() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});

	const albumItem = data?.RECOMMEND_LIST[0];

	return (
		<>{albumItem && <AlbumList isTitle={false} recommendList={albumItem} />}</>
	);
}
