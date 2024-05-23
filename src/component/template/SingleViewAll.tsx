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

interface SingleViewAllProps {
	list_id?: string;
}

export default function SingleViewAll({list_id} : SingleViewAllProps) {
	const [AlbumContent, setAlbumContent] = useState<TVIEWALL_LIST_RESPONSE>();
	
	useEffect(() => {
		// const recent = ;
		getViewallAxios(list_id).then(data => 
			data?setAlbumContent(data):null
		);
	}, []);

	return (
		<>
			<PlayButtonGroup />
			{AlbumContent?.RECOMMEND_LIST.map(
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
