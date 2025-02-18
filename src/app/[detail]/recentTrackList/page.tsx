"use client";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import { useSearchParams } from 'next/navigation';
import { TRACK_RECENT_LIST_RESPONSE, getRecentTrackListAxios } from "@/services/contents/RecentTrackListAxios";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import RCTTrackList from "@/component/organism/trackList/RCTTrackList";

export default function RecentViewAllTrackList() {
	const searchParams = useSearchParams();
	const totalCount = parseInt(searchParams.get("totalcnt") || "0", 10);
	const title = searchParams.get('title');
	const { setSubTitle } = useContext(SubTitleContext);
	const ITEMS_PER_PAGE = 20;

	const [currentPage, setCurrentPage] = useState(0);
	const [recentTrackList, setRecentTrackList] = useState<TRACK_RECENT_LIST_RESPONSE>({
		message: "success",
		code: "200",
		totalCount: totalCount,
		size: ITEMS_PER_PAGE,
		page: 0,
		last: false,
		offset: 0,
		tracks: []
	});
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setSubTitle(title);
	}, [title, setSubTitle]);

	const fetchTracks = useCallback(async (page: number) => {
		if (isLoading || !hasMore) return;

		try {
			setIsLoading(true);
			const response = await getRecentTrackListAxios("", page, ITEMS_PER_PAGE);
			
			if (response.tracks.length > 0) {
				setRecentTrackList(prev => ({
					...response,
					tracks: page === 0 ? response.tracks : [...prev.tracks, ...response.tracks]
				}));
				setCurrentPage(page);
				setHasMore(!response.last);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error('Error fetching tracks:', error);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, hasMore]);

	// 초기 데이터 로드
	useEffect(() => {
		fetchTracks(0);
	}, [fetchTracks]);

	// 스크롤 이벤트 핸들러
	const handleScroll = useCallback(() => {
		if (!containerRef.current || isLoading || !hasMore) return;

		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		
		// 스크롤이 하단에서 200px 위치에 도달했을 때 다음 페이지 로드
		if (scrollHeight - scrollTop <= clientHeight + 200) {
			fetchTracks(currentPage + 1);
		}
	}, [currentPage, fetchTracks, isLoading, hasMore]);

	// 스크롤 이벤트 리스너 등록
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<SubTitleProvider>
			<div 
				className="detailSinglePage"
				ref={containerRef}
			>
				{recentTrackList.tracks.length > 0 && (
					<RCTTrackList trackList={recentTrackList} />
				)}
				{isLoading && (
					<div className="loading">Loading more tracks...</div>
				)}
			</div>
			<style jsx>{`
				.detailSinglePage {
					min-height: 100vh;
				}
				.loading {
					text-align: center;
					padding: 20px;
					color: #666;
				}
			`}</style>
		</SubTitleProvider>
	);
}


