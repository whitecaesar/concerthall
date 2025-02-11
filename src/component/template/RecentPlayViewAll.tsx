"use client";
import RecentPlayListViewAll from "../organism/albumList/RecentPlayListViewAll";
import { getRecentPlayListAxios, PLAY_RECENT_LIST_RESPONSE } from "@/services/contents/RecentPlayListAxios";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../atom/dropdown/dropdown";
import { getDropdownOptions, DropdownOption } from "@/interface/DropdownType";
import { getCookie } from "@/services/common";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";

interface RecentPlayViewAllProps {
  totalCnt: any;
}

export default function RecentPlayViewAll(total: RecentPlayViewAllProps) {
  const [recent, setRecent] = useState<PLAY_RECENT_LIST_RESPONSE>();
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const lang = getCookie("lang") || "en"; // 쿠키에서 언어 값을 가져오거나 기본값으로 영어를 설정
    const options = getDropdownOptions(lang);
    setDropdownOptions(options);

    // 데이터 가져오기
    getRecentPlayListAxios('', total.totalCnt).then(data => setRecent(data));
  }, [total.totalCnt]);

  const handleRecentChange = (event: string) => {
    if (event === 'recent') {
      recent?.recentList.sort((a, b) => a.playlist.playTime.localeCompare(b.playlist.playTime));
    } else if (event === 'preference') {
      recent?.recentList.sort((a, b) => b.playlist.star - a.playlist.star);
    } else if (event === 'ascending') {
      recent?.recentList.sort((a, b) => a.playlist.title.localeCompare(b.playlist.title));
    } else if (event === 'descending') {
      recent?.recentList.sort((a, b) => -a.playlist.title.localeCompare(b.playlist.title));
    }

    recent && setRecent({ ...recent });
  };

  return (
    <>
      <Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
      {recent && <RecentPlayListViewAll playListViewAllList={recent} />}
    </> 
  );
}
