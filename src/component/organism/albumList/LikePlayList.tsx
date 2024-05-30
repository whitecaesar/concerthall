"use client";
import { useEffect, useState } from "react";
import { albumDropdownOptions, dropdownOptions } from "@/interface/DropdownType";
import {MY_RECENT_LIST_RESPONSE } from "@/services/contents/MyPlayListAxios";
import Dropdown from "@/component/atom/dropdown/dropdown";
import MyPlayListView from "./MyPlayListView";
import { getLikePlayListAxios } from "@/services/contents/LikePlayListAxios";
interface MyPlayViewAllProps {
	totalCnt: any;
}

export default function MyPlayViewAll(total : MyPlayViewAllProps) {
	const [recent, setRecent] = useState<MY_RECENT_LIST_RESPONSE>();
	useEffect(() => {
		// const recent = ;
		getLikePlayListAxios('', total.totalCnt).then(data => 
			setRecent(data)
		);

	}, []);

	const handleRecentChange = (event : string) => {
		if(event == 'recent')
		{
			recent?.playlists.sort((a , b) => a.playTime.localeCompare(b.playTime));
		}
		else if(event == 'preference')
		{
			recent?.playlists.sort((a , b) => b.star - a.star);
		}
		else if(event == 'ascending')
		{
			recent?.playlists.sort((a , b) => a.title.localeCompare(b.title));
		}
		else if(event == 'descending')
		{
			recent?.playlists.sort((a , b) => -a.title.localeCompare(b.title));
		}

		recent && setRecent({...recent});
	};

	return (
		<>
			<Dropdown options={albumDropdownOptions} onRecentChange={handleRecentChange} />
            {recent&&<MyPlayListView myPlayListViewList={recent} />}
		</>
	);
}
