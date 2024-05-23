"use client";
import RecentPlayListViewAll from "../organism/albumList/RecentPlayListViewAll";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import { useQuery } from "@tanstack/react-query";
import { getRecentPlayListAxios, PLAY_RECENT_LIST_RESPONSE } from "@/services/contents/RecentPlayListAxios";
import { useEffect, useState } from "react";
import Dropdown from "../atom/dropdown/dropdown";
import { dropdownOptions } from "@/interface/DropdownType";

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

	const handleRecentChange = (event : string) => {
		if(event == 'recent')
		{
			recent?.recentList.sort((a , b) => a.playlist.playTime.localeCompare(b.playlist.playTime));
		}
		else if(event == 'preference')
		{
			recent?.recentList.sort((a , b) => b.playlist.star - a.playlist.star);
		}
		else if(event == 'ascending')
		{
			recent?.recentList.sort((a , b) => a.playlist.title.localeCompare(b.playlist.title));
		}
		else if(event == 'descending')
		{
			recent?.recentList.sort((a , b) => -a.playlist.title.localeCompare(b.playlist.title));
		}

		recent && setRecent({...recent});
	};

	return (
		<>
			<Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
            {recent&&<RecentPlayListViewAll playListViewAllList={recent} />}
		</>
	);
}
