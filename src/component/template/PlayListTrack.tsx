"use client";
import { useQuery } from "@tanstack/react-query";
import { getPlayListTrackListAxios, TRACK_TRACKS_ITEM_TYPE } from "@/services/contents/PlayListTrackAxios";
import PlaylistDetailInfo from "../molecule/detailInfo/PlaylistDetailInfo";
import FuncPlayListButtonGroup from "../molecule/buttonGroup/FuncPlayListButtonGroup";
import { getPLLIKEAxios } from "@/services/contents/PLLikeAxio";
import { useEffect, useState, useRef, useCallback } from "react";
import Loading from "@/app/loading";
import PLTrackItem from "../molecule/trackItem/PLTrackItem";

interface PlayListTrackProps {
	playList_id: string;
	func_type?: string;
	size: number;
}

export default function PlayListTrack({
	playList_id,
	func_type,
	size,
}: PlayListTrackProps) {
	const [like, setLike] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [visibleTracks, setVisibleTracks] = useState<TRACK_TRACKS_ITEM_TYPE[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const ITEMS_PER_PAGE = 20;

	const { data, isError } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: () => getPlayListTrackListAxios(playList_id, size),
	});

	useEffect(() => {
		getPLLIKEAxios(playList_id).then((data) =>
			data.code == "200" ? setLike(data.result) : alert(data.code)
		);
	}, [playList_id]);

	// 초기 트랙 설정
	useEffect(() => {
		if (data?.playlist?.tracks) {
			setVisibleTracks(data.playlist.tracks.slice(0, ITEMS_PER_PAGE));
			setHasMore(data.playlist.tracks.length > ITEMS_PER_PAGE);
		}
	}, [data]);

	// 스크롤 이벤트 핸들러
	const loadMoreTracks = useCallback(() => {
		if (isLoading || !hasMore || !data?.playlist?.tracks) return;

		const nextPage = currentPage + 1;
		const start = nextPage * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;

		setIsLoading(true);
		
		// 다음 페이지의 트랙들 추가
		if (start < data.playlist.tracks.length) {
			setVisibleTracks(prev => [...prev, ...data.playlist.tracks.slice(start, end)]);
			setCurrentPage(nextPage);
			setHasMore(end < data.playlist.tracks.length);
		} else {
			setHasMore(false);
		}
		
		setIsLoading(false);
	}, [currentPage, data, isLoading, hasMore]);

	// 스크롤 이벤트 핸들러
	const handleScroll = useCallback(() => {
		if (!containerRef.current || isLoading || !hasMore) return;

		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		
		if (scrollHeight - scrollTop <= clientHeight + 200) {
			loadMoreTracks();
		}
	}, [loadMoreTracks, isLoading, hasMore]);

	// 스크롤 이벤트 리스너 등록
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	if (isError || !data) return <div>Error occurred</div>;
	const PlayList = data?.playlist;

	return (
		<>
			<PlaylistDetailInfo detailInfo={PlayList} />
			<FuncPlayListButtonGroup
				trackItem={PlayList}
				pageType={"PlayListPage"}
				like={like}
			/>
			{PlayList && 
				<div 
					className="trackListWrap"
					ref={containerRef}
				>
					<div className="trackNum">
						<span>{PlayList.tracks.length} Tracks</span>
					</div>
					<ul className="trackList">
						{visibleTracks.map((itemInfo:TRACK_TRACKS_ITEM_TYPE, index:number) => (
							<li key={itemInfo.id}>
								<PLTrackItem 
									trackInfo={itemInfo} 
									trackListInfo={PlayList} 
									position={index} 
									method='playlist'
								/>
							</li>
						))}
					</ul>
					{isLoading && (
						<div className="loading">Loading more tracks...</div>
					)}
					<style jsx>{`
						.trackListWrap {
							margin-top: 10px;
							.trackNum {
								padding: 10px 15px;
								font-size: 13px;
							}
							.trackList {
								list-style: none;
								padding: 0;
								li {
									margin: 5px 0;
								}
							}
							.loading {
								text-align: center;
								padding: 20px;
								color: #666;
							}
						}
					`}</style>
				</div>
			}
		</>
	);
}
