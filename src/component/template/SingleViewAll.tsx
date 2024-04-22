"use client";
import SingleListViewAll from "../organism/singleList/SingleListViewAll";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import { useQuery } from "@tanstack/react-query";
import {
	TVIEWALL_LIST_RESPONSE,
	VIEWALL_LIST_TYPE,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";
import { ReactNode, useContext, useEffect, useState } from "react";

export default function SingleViewAll() {
	const [AlbumContent, setAlbumContent] = useState<TVIEWALL_LIST_RESPONSE>();
	
	useEffect(() => {
		// const recent = ;
		getViewallAxios(2).then(data => 
			data?setAlbumContent(data):null
		);
	}, []);

	console.log(AlbumContent?.VIEWALL_LIST);

	return (
		<>
			<PlayButtonGroup />
			{AlbumContent?.VIEWALL_LIST.map(
				(content: VIEWALL_LIST_TYPE) => {
					return (
						<>
							<SingleListViewAll viewAllList={content} />
						</>
					);
				}
			)}
		</>
	);
}
