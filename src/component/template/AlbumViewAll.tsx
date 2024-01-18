"use client";
import AlbumListViewAll from "../organism/albumList/AlbumListViewAll";
import { useQuery } from "@tanstack/react-query";
import {
	TVIEWALL_LIST_RES,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";

export default function AlbumViewAll() {
	const { data } = useQuery({
		queryKey: ["VIEWALL-LIST"],
		queryFn: () => {
			const viewAllList = getViewallAxios();
			return viewAllList;
		},
	});

	console.log(data?.VIEWALL_LIST);

	return (
		<>
			{data?.VIEWALL_LIST.map((content: TVIEWALL_LIST_RES) => {
				return (
					<>
						<AlbumListViewAll viewAllList={content} />
					</>
				);
			})}
		</>
	);

	// return (
	// 	<>
	// 		<AlbumListViewAll viewAllList={data?.VIEWALL_LIST} />
	// 	</>
	// );
}
