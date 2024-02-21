"use client";
import SingleListViewAll from "../organism/singleList/SingleListViewAll";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import { useQuery } from "@tanstack/react-query";
import {
	VIEWALL_LIST_TYPE,
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
			{data?.VIEWALL_LIST.filter((item) => item.ID === 1).map(
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
