"use client";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import AlbumList from "../albumList/AlbumList";

export default function PlayList() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});
	const { setSubTitle } = useContext(SubTitleContext);
	const albumItem = data?.RECOMMEND_LIST[0];

	useEffect(() => {
		setSubTitle("MY 플레이리스트");
	}, []);

	return (
		<>{albumItem && <AlbumList isTitle={false} recommendList={albumItem} />}</>
	);
}
