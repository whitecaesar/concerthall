"use client";

import React from "react";
import {
	TTXT_BANNER_RES,
	getBannersAxios,
} from "@/services/main/MainInfoAxios";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import style from "./textBanner.module.css";
import Icon from "@/component_RS/button/icon/Icon";

export default function TextBanner({
	banner,
	isFetched,
}: { banner: TTXT_BANNER_RES | undefined } & { isFetched: boolean }) {
	return (
		<Suspense fallback="로딩중">
			{banner ? (
				<div className={style.textBanner}>
					<Link key={banner.ID_BANNER} href={banner.LINK ? banner.LINK : ""}>
						<p>{banner.CONTENTS}</p>
						<Icon iconName="arrowRightBrown" />
					</Link>
				</div>
			) : (
				<></>
			)}
		</Suspense>
	);
}
