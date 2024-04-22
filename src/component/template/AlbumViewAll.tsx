"use client";
import AlbumListViewAll from "../organism/albumList/AlbumListViewAll";
import { useQuery } from "@tanstack/react-query";
import {
	TVIEWALL_LIST_RESPONSE,
	VIEWALL_LIST_TYPE,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import Dropdown from "../atom/dropdown/dropdown";
import { dropdownOptions, albumDropdownOptions } from "@/interface/DropdownType";
import { ReactNode, useContext, useEffect, useState } from "react";

export default function AlbumViewAll() {

	const [AlbumContent, setAlbumContent] = useState<TVIEWALL_LIST_RESPONSE>();
	const { setSubTitle } = useContext(SubTitleContext);
	
	useEffect(() => {
		// const recent = ;
		getViewallAxios(1).then(data => 
			data?setAlbumContent(data):null
		);
	}, []);

	const handleRecentChange = (event : string) => {
		if(event == 'preference')
		{
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a , b) => a.TITLE.localeCompare(b.TITLE));
		}
		/*
		else if(event == 'preference')
		{
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a , b) => b.album.star - a.album.star);
		}
		*/
		else if(event == 'ascending')
		{
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a , b) => a.TITLE.localeCompare(b.TITLE));
		}
		else if(event == 'descending')
		{
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a , b) => -a.TITLE.localeCompare(b.TITLE));
		}

		console.log(AlbumContent);
		AlbumContent && setAlbumContent({...AlbumContent});
	};

	return (
		<>
			<SubTitleProvider>
				{/* <PlayButtonGroup /> */}
				<Dropdown options={albumDropdownOptions}  onRecentChange={handleRecentChange} />
				{AlbumContent?.VIEWALL_LIST.map(
					(content: VIEWALL_LIST_TYPE, index: number) => (
						<AlbumListViewAll key={content.ID} viewAllList={content} />
					)
				)}
			</SubTitleProvider>
		</>
	);
}
