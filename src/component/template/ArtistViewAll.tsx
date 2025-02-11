"use client";
import {
	TVIEWALL_LIST_RESPONSE,
} from "@/services/contents/ViewAllAxios";
import {useContext, useEffect, useState } from "react";

export default function ArtistViewAll() {
	const [AlbumContent, setAlbumContent] = useState<TVIEWALL_LIST_RESPONSE>();

	useEffect(() => {
		// const recent = ;
//		getViewallAxios(1).then((data) => (data ? setAlbumContent(data) : null));
	}, []);

	const handleRecentChange = (event: string) => {
		/*
		if (event == "preference") {
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a, b) =>
				a.TITLE.localeCompare(b.TITLE)
			);
		} else if (event == "ascending") {
		*/
		/*
		else if(event == 'preference')
		{
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a , b) => b.album.star - a.album.star);
		}
		*/
		/*
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort((a, b) =>
				a.TITLE.localeCompare(b.TITLE)
			);
		} else if (event == "descending") {
			AlbumContent?.VIEWALL_LIST[0].ITEM_INFO.sort(
				(a, b) => -a.TITLE.localeCompare(b.TITLE)
			);
		}

		console.log(AlbumContent);
		AlbumContent && setAlbumContent({ ...AlbumContent });
		*/
	};

	return (
		<>
			{/*
			<SubTitleProvider>
				<Dropdown
					options={albumDropdownOptions}
					onRecentChange={handleRecentChange}
				/>
				{AlbumContent?.VIEWALL_LIST.map(
					(content: VIEWALL_LIST_TYPE, index: number) => (
						<ArtistListViewAll key={content.ID} viewAllList={content} />
					)
				)}
			</SubTitleProvider>
			*/}
		</>
	);
}
