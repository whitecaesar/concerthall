"use client";
import RecentPlayListViewAll from "../organism/albumList/RecentPlayListViewAll";
import { getRecentPlayListAxios, PLAY_RECENT_LIST_RESPONSE, PLAY_RECENT_LIST_TYPE } from "@/services/contents/RecentPlayListAxios";
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
  const [sortedList, setSortedList] = useState<PLAY_RECENT_LIST_TYPE[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const lang = getCookie("lang") || "en";
    const options = getDropdownOptions(lang);
    const page = 0;
    setDropdownOptions(options);
    
    getRecentPlayListAxios("", page, total.totalCnt).then(data => {
      setRecent(data);
      setSortedList(data.recentList); // 초기 리스트 설정
    });
  }, [total.totalCnt]);

  const handleRecentChange = (event: string) => {
    if (!recent?.recentList) return;

    let newSortedList = [...recent.recentList];

    if (event === "recent") {
      newSortedList.sort((a, b) => a.playlist.playTime.localeCompare(b.playlist.playTime));
    } else if (event === "preference") {
      newSortedList.sort((a, b) => b.playlist.star - a.playlist.star);
    } else if (event === "ascending") {
      newSortedList.sort((a, b) => a.playlist.title.localeCompare(b.playlist.title));
    } else if (event === "descending") {
      newSortedList.sort((a, b) => b.playlist.title.localeCompare(a.playlist.title));
    }

    // 정렬된 리스트로 상태 업데이트
    setSortedList(newSortedList);
    setRecent(prev => prev ? {
      ...prev,
      recentList: newSortedList
    } : undefined);
  };

  return (
    <>
      <SubTitleProvider>
        <Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
        {recent && sortedList.length > 0 && (
          <RecentPlayListViewAll 
            playListViewAllList={recent}
          />
        )}
      </SubTitleProvider>
    </>
  );
}
