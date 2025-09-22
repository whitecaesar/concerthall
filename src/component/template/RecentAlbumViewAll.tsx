"use client";
import SubTitleProvider from "@/providers/SubTitleProvider";
import Dropdown from "../atom/dropdown/dropdown";
import { DropdownOption, getDropdownOptions } from "@/interface/DropdownType";
import { getRecentAlbumAxios, ALBUM_RECENT_LIST_RESPONSE, ALBUM_RECENT_LIST_TYPE } from "@/services/contents/RecentAlbumAxios";
import { useEffect, useState, useRef, useCallback } from "react";
import { getCookie } from "@/services/common";
import style from "../organism/albumList/albumList.module.css";
import RecentAlbumItem from "../molecule/albumItem/RecentAlbumItem";
import { ALBUM_TRACK_CNT_RESPONSE_TYPE, getAlbumTrackCnt } from "@/services/contents/AlbumAxios";

interface RecentAlbumViewAllProps {
  totalCnt: any;
}

export default function RecentAlbumViewAll(total: RecentAlbumViewAllProps) {
  const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE>();
  const [sortedList, setSortedList] = useState<ALBUM_RECENT_LIST_TYPE[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 20;
  const [trackCntResult, setTrackCntResult] = useState<ALBUM_TRACK_CNT_RESPONSE_TYPE | null>(null);

  useEffect(() => {
    const lang = getCookie("lang") || "en";
    const options = getDropdownOptions(lang);
    setDropdownOptions(options);
    
    // 초기 데이터 로드
    fetchAlbums(0);
  }, [total.totalCnt]);

  const fetchAlbums = async (page: number) => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const data = await getRecentAlbumAxios("", page, ITEMS_PER_PAGE);
      
      if (data.recentList.length > 0) {

        const albumIds = data.recentList.map(item => item.album.clientKey);
				
				// getAlbumTrackCnt 함수에 전달할 파라미터 생성
				const param = {
					albums: albumIds.map(id => ({ albumId: id }))
				};
				
				// getAlbumTrackCnt 함수 호출
				const result = await getAlbumTrackCnt(param);
				setTrackCntResult(result);
        
        setRecent(prev => prev ? {
          ...data,
          recentList: page === 0 ? data.recentList : [...prev.recentList, ...data.recentList]
        } : data);
        setSortedList(prev => page === 0 ? data.recentList : [...prev, ...data.recentList]);
        setCurrentPage(page);
        setHasMore(data.recentList.length === ITEMS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      fetchAlbums(currentPage + 1);
    }
  }, [currentPage, isLoading, hasMore]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleRecentChange = (event: string) => {
    // 페이지와 상태 초기화
    setCurrentPage(0);
    setHasMore(true);
    
    fetchAlbums(0); // 초기 데이터 로드
    let newSortedList = [...recent?.recentList || []];

    /*
    if (event === "recent") {
      // recent 정렬 로직
      // newSortedList.sort((a, b) => a.album.playTime.localeCompare(b.album.playTime));
    } else
    */
    if (event === "preference") {
      newSortedList.sort((a, b) => b.album.star - a.album.star);
    } else if (event === "ascending") {
      newSortedList.sort((a, b) => a.album.title.localeCompare(b.album.title));
    } else if (event === "descending") {
      newSortedList.sort((a, b) => b.album.title.localeCompare(a.album.title));
    }

    setSortedList(newSortedList);
  };

  return (
    <>
      <SubTitleProvider>
        <Dropdown options={dropdownOptions} onRecentChange={handleRecentChange} />
        <div 
          ref={containerRef}
          className={style.albumListContainer}
        >
          <ul className={`${style.albumList} ${style.noScroll}`}>
            {sortedList.map((item: ALBUM_RECENT_LIST_TYPE) => (
              <li key={item.album.id}>
                <RecentAlbumItem
                  albumInfo={item.album}
                  trackCnt={trackCntResult?.albums.find(album => album.album_id === item.album.clientKey)?.track_cnt}
                />
              </li>
            ))}
          </ul>
          {isLoading && (
            <div className="loading">Loading more albums...</div>
          )}
        </div>
      </SubTitleProvider>
      <style jsx>{`
        .loading {
          text-align: center;
          padding: 20px;
          color: #666;
        }
      `}</style>
    </>
  );
}
