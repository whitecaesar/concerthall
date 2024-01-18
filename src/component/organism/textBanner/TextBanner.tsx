"use client";

import React from "react";
import {
	TTXT_BANNER_RES,
	getBannersAxios,
} from "@/services/banner/MainInfoAxios";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import style from "./textBanner.module.css";
import Icon from "@/component/atom/icon/Icon";

export default function TextBanner({
	list,
	isFetched,
}: { list: TTXT_BANNER_RES[] | undefined } & { isFetched: boolean }) {
	const { data } = useQuery({
		queryKey: ["TXT_BANNER"],
		queryFn: () => {
			return getBannersAxios();
		},
	});

	return (
		<Suspense fallback="로딩중">
			<div className={style.textBanner}>
				{data?.TXT_BANNER.map((banner: TTXT_BANNER_RES) => (
					<Link key={banner.ID_BANNER} href={banner.LINK}>
						<p>{banner.CONTENT}</p>
						<Icon iconName="arrowRightBrown" />
					</Link>
				))}
			</div>
		</Suspense>
	);
}
