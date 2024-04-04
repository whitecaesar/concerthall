"use client";
import React from "react";
import Main from "@/component_RS/template/Main";
import { redirect } from "next/navigation";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { useQuery } from "@tanstack/react-query";

export default function MainPage() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: getBannersAxios,
	});

	isFetched && redirect(`/RS/main/${data?.RECOMMEND_LIST[0].ID}`);
	return <div className="mainPage">{/* <Main /> */}</div>;
}
