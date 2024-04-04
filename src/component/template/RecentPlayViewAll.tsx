"use client";
import RecentPlayListViewAll from "../organism/singleList/RecentPlayListViewAll";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import { useQuery } from "@tanstack/react-query";
import { getRecentPlayListAxios, PLAY_RECENT_LIST_RESPONSE } from "@/services/contents/RecentPlayListAxios";
import { useEffect, useState } from "react";

interface RecentPlayViewAllProps {
	totalCnt: any;
}

export default function RecentPlayViewAll(total : RecentPlayViewAllProps) {
	const [recent, setRecent] = useState<PLAY_RECENT_LIST_RESPONSE>();
	useEffect(() => {
		// const recent = ;
		getRecentPlayListAxios('', total.totalCnt).then(data => 
			setRecent(data)
		);

	}, []);

	return (
		<>
			<PlayButtonGroup />
            {recent&&<RecentPlayListViewAll playListViewAllList={recent} />}
		</>
	);
}
