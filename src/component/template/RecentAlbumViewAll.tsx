"use client";
import SubTitleProvider from "@/providers/SubTitleProvider";
import Dropdown from "../atom/dropdown/dropdown";
import { DropdownOption, getDropdownOptions } from "@/interface/DropdownType";
import { getRecentAlbumAxios, ALBUM_RECENT_LIST_RESPONSE } from "@/services/contents/RecentAlbumAxios";
import { useEffect, useState } from "react";
import RecentAlbumListViewAll from "../organism/albumList/RecentAlbumListViewAll";
import { getCookie } from "@/services/common";

interface RecentAlbumViewAllProps {
  totalCnt: any;
}

export default function RecentAlbumViewAll(total: RecentAlbumViewAllProps) {
  const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE>();
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const lang = getCookie("lang") || "en"; // 쿠키에서 언어 값을 가져오거나 기본값으로 영어를 설정
    const options = getDropdownOptions(lang);
    setDropdownOptions(options);
    // 데이터 가져오기
    getRecentAlbumAxios("", total.totalCnt).then(data => setRecent(data));
  }, [total.totalCnt]);

  const handleRecentChange = (event: string) => {
    if (event === "recent") {
      //recent?.recentList.sort((a , b) => a.album.playTime.localeCompare(b.album.playTime));
    } else if (event === "preference") {
      recent?.recentList.sort((a, b) => b.album.star - a.album.star);
    } else if (event === "ascending") {
      recent?.recentList.sort((a, b) => a.album.title.localeCompare(b.album.title));
    } else if (event === "descending") {
      recent?.recentList.sort((a, b) => -a.album.title.localeCompare(b.album.title));
    }

    recent && setRecent({ ...recent });
  };

  return (
    <>
      <SubTitleProvider>
        <Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
        {recent && <RecentAlbumListViewAll recentViewAllList={recent} />}
      </SubTitleProvider>
    </>
  );
}
