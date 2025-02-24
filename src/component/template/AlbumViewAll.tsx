"use client";
import AlbumListViewAll from "../organism/albumList/AlbumListViewAll";
import {
	TVIEWALL_LIST_RESPONSE,
	VIEWALL_LIST_TYPE,
	getViewallAxios,
} from "@/services/contents/ViewAllAxios";
import Dropdown from "../atom/dropdown/dropdown";
import { getAlbumDropdownOptions, DropdownOption } from "@/interface/DropdownType";
import { useEffect, useState } from "react";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { getCookie } from "@/services/common";

interface AlbumViewAllProps {
	list_id?: string;
}

export default function AlbumViewAll({ list_id }: AlbumViewAllProps) {
	const [AlbumContent, setAlbumContent] = useState<TVIEWALL_LIST_RESPONSE>();
	const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

	useEffect(() => {
		const lang = getCookie("lang") || "en"; // 쿠키에서 언어 값을 가져오거나 기본값으로 영어를 설정
		const options = getAlbumDropdownOptions(lang);
		setDropdownOptions(options);

		// 데이터 가져오기
		getViewallAxios(list_id).then(data => data ? setAlbumContent(data) : null);
	}, [list_id]);

	const handleRecentChange = (event: string) => {
		if (event === 'recent') {
			AlbumContent?.RECOMMEND_LIST[0].ITEM_INFO.sort((a, b) => a.TITLE.localeCompare(b.TITLE));
		} /* else if (event === 'preference') {
			AlbumContent?.RECOMMEND_LIST[0].ITEM_INFO.sort((a, b) => b.album.star - a.album.star);
		} */else if (event === 'ascending') {
			AlbumContent?.RECOMMEND_LIST[0].ITEM_INFO.sort((a, b) => a.TITLE.localeCompare(b.TITLE));
		} else if (event === 'descending') {
			AlbumContent?.RECOMMEND_LIST[0].ITEM_INFO.sort((a, b) => -a.TITLE.localeCompare(b.TITLE));
		}

		AlbumContent && setAlbumContent({ ...AlbumContent });
	};

	return (
		<>
			<SubTitleProvider>
				<Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
				{AlbumContent?.RECOMMEND_LIST.map(
					(content: VIEWALL_LIST_TYPE, index: number) => (
						<AlbumListViewAll key={content.ID} viewAllList={content} />
					)
				)}
			</SubTitleProvider>
		</>
	);
}
