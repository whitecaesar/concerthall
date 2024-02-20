"use client";
import AlbumListViewAll from "../organism/albumList/AlbumListViewAll";
import { useQuery } from "@tanstack/react-query";
import {
	VIEWALL_LIST_TYPE,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";

export default function AlbumViewAll() {
	const { data } = useQuery({
		queryKey: ["VIEWALL-LIST"],
		queryFn: () => {
			const viewAllList = getViewallAxios();
			return viewAllList;
		},
	});

	return (
		<>
			<PlayButtonGroup />
			{data?.VIEWALL_LIST.map((content: VIEWALL_LIST_TYPE, index: number) => (
				<AlbumListViewAll key={content.ID} viewAllList={content} />
			))}
		</>
	);
}
