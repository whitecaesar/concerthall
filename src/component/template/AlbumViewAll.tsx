"use client";
import AlbumListViewAll from "../organism/albumList/AlbumListViewAll";
import { useQuery } from "@tanstack/react-query";
import {
	VIEWALL_LIST_TYPE,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";
import PlayButtonGroup from "../molecule/buttonGroup/PlayButtonGroup";
import SubTitleProvider from "@/providers/SubTitleProvider";
import Dropdown from "../atom/dropdown/dropdown";
import { dropdownOptions } from "@/interface/DropdownType";

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
			<SubTitleProvider>
				{/* <PlayButtonGroup /> */}
				<Dropdown options={dropdownOptions} />
				{data?.VIEWALL_LIST.filter((item) => item.ID === 0).map(
					(content: VIEWALL_LIST_TYPE, index: number) => (
						<AlbumListViewAll key={content.ID} viewAllList={content} />
					)
				)}
			</SubTitleProvider>
		</>
	);
}
