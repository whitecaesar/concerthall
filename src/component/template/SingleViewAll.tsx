"use client";
import SingleListViewAll from "../organism/singleList/SingleListViewAll";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import { useQuery } from "@tanstack/react-query";
import {
	TVIEWALL_LIST_RES,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";

export default function SingleViewAll() {
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
			<PlayButtonGroup />
			{data?.VIEWALL_LIST.map((content: TVIEWALL_LIST_RES) => {
				return (
					<>
						<SingleListViewAll viewAllList={content} />
					</>
				);
			})}
		</>
	);
}
