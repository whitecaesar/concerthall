"use client";
import { useEffect, useState } from "react";
import Dropdown from "../atom/dropdown/dropdown";
import { getAlbumDropdownOptions, DropdownOption } from "@/interface/DropdownType";
import { getMyPlayListAxios, MY_RECENT_LIST_RESPONSE } from "@/services/contents/MyPlayListAxios";
import MyPlayListView from "../organism/albumList/MyPlayListView";
import { getCookie } from "@/services/common";

interface MyPlayViewAllProps {
  totalCnt: any;
}

export default function MyPlayViewAll(total: MyPlayViewAllProps) {
  const [recent, setRecent] = useState<MY_RECENT_LIST_RESPONSE>();
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const lang = getCookie("lang") || "en"; // 쿠키에서 언어 값을 가져오거나 기본값으로 영어를 설정
    const options = getAlbumDropdownOptions(lang);
    setDropdownOptions(options);

    // 데이터 가져오기
    getMyPlayListAxios("", total.totalCnt).then(data => setRecent(data));
  }, [total.totalCnt]);

  const handleRecentChange = (event: string) => {
    if (event === "recent") {
      recent?.playlists.sort((a, b) => a.playTime.localeCompare(b.playTime));
    } else if (event === "preference") {
      recent?.playlists.sort((a, b) => b.star - a.star);
    } else if (event === "ascending") {
      recent?.playlists.sort((a, b) => a.title.localeCompare(b.title));
    } else if (event === "descending") {
      recent?.playlists.sort((a, b) => -a.title.localeCompare(b.title));
    }

    recent && setRecent({ ...recent });
  };

  return (
    <>
      <Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
      {recent && <MyPlayListView myPlayListViewList={recent} />}
    </>
  );
}
