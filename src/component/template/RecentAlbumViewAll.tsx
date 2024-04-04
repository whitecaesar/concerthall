"use client";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import Dropdown from "../atom/dropdown/dropdown";
import { dropdownOptions } from "@/interface/DropdownType";
import { getRecentAlbumAxios, ALBUM_RECENT_LIST_TYPE, ALBUM_RECENT_LIST_RESPONSE } from "@/services/contents/RecentAlbumAxios";
import { useContext, useEffect, useState } from "react";
import RecentAlbumListViewAll from "../organism/albumList/RecentAlbumListViewAll";

interface RecentAlbumViewAllProps {
	totalCnt: any;
}

export default function RecentAlbumViewAll(total : RecentAlbumViewAllProps) {
    const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE>();
	const { setSubTitle } = useContext(SubTitleContext);
	
	useEffect(() => {
		// const recent = ;
		getRecentAlbumAxios('', total.totalCnt).then(data => 
			setRecent(data)
		);

	}, []);

	const handleRecentChange = (event : string) => {
		if(event == 'recent')
		{
			recent?.recentList.sort((a , b) => a.album.playTime.localeCompare(b.album.playTime));
		}
		else if(event == 'preference')
		{
			recent?.recentList.sort((a , b) => b.album.star - a.album.star);
		}
		else if(event == 'ascending')
		{
			recent?.recentList.sort((a , b) => a.album.title.localeCompare(b.album.title));
		}
		else if(event == 'descending')
		{
			recent?.recentList.sort((a , b) => -a.album.title.localeCompare(b.album.title));
		}

		console.log(recent);
		recent && setRecent({...recent});
	};

	return (
		<>
			<SubTitleProvider>
				{/* <PlayButtonGroup /> */}
				<Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
				{recent&&<RecentAlbumListViewAll  recentViewAllList={recent} />}
			</SubTitleProvider>
		</>
	);
}
