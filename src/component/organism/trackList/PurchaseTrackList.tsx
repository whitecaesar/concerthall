"use client";
import React, { useEffect, useState, useRef } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackItem from "@/component/molecule/trackItem/AlbumTrackItem";
import { STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, STAR_TRACK_REQUEST_TYPE, getStarAxios, getStarTrackAxios } from "@/services/contents/StarAxios";

interface TrackListProps {
	PurchaseTrackList: ALBUM_ITEM_TYPE[];
}

const PurchaseTrackList = ({ PurchaseTrackList }: TrackListProps) => {
	const [isFetch, setIsFetch] = useState<boolean>(false);
	const [visibleTracks, setVisibleTracks] = useState<ALBUM_ITEM_TYPE[]>([]);
	const [page, setPage] = useState(0);
	const trackListRef = useRef<HTMLDivElement>(null);
	const ITEMS_PER_PAGE = 20;

	function addPropertyToItemInfo(id: string, propertyName: string, propertyValue: number) {
		const item = PurchaseTrackList.find(item => item.ID === id);
		if (item) {
			(item as any)[propertyName] = propertyValue;
		}
	}

	useEffect(() => {
		fetchStarRatings();
	}, [PurchaseTrackList]);

	// 초기 트랙 로드 및 star ratings 설정 후 visible tracks 업데이트
	useEffect(() => {
		if (isFetch && PurchaseTrackList) {
			setPage(0);
			setVisibleTracks(PurchaseTrackList.slice(0, ITEMS_PER_PAGE));
		}
	}, [isFetch, PurchaseTrackList]);

	const fetchStarRatings = async () => {
		const promises = PurchaseTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
			try {
				const starTrackParam: STAR_TRACK_REQUEST_TYPE = {
					tracks: [{ type: 'CONCERT_HALL', clientKey: track.ID }]
				};
				const trackStarResponse = await getStarTrackAxios(starTrackParam);

				if (trackStarResponse.id !== null) {
					const contentParam: STAR_REQUEST_ITEM_TYPE[] = [{
						id: trackStarResponse.id,
						clientKey: track.ID
					}];
					const params: STAR_REQUEST_TYPE = {
						contents: contentParam,
						mediaType: 'CONCERT_HALL'
					};
					const response = await getStarAxios('TRACK', params);
					addPropertyToItemInfo(track.ID, 'STAR', response.code === '200' ? response.contents[0].star : 0);
				} else {
					addPropertyToItemInfo(track.ID, 'STAR', 0);
				}
			} catch (error) {
				console.error('Error fetching star rating', error);
				addPropertyToItemInfo(track.ID, 'STAR', 0);
			}
		});

		await Promise.all(promises);
		setIsFetch(true);
	};

	// 스크롤 이벤트 핸들러
	const handleScroll = () => {
		if (trackListRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = trackListRef.current;

			if (scrollHeight - scrollTop === clientHeight) {
				const nextPage = page + 1;
				const start = nextPage * ITEMS_PER_PAGE;
				const end = start + ITEMS_PER_PAGE;

				if (PurchaseTrackList && start < PurchaseTrackList.length) {
					const newTracks = PurchaseTrackList.slice(0, end);
					setVisibleTracks(newTracks);
					setPage(nextPage);
				}
			}
		}
	};

	// 스크롤 이벤트 리스너 등록
	useEffect(() => {
		const trackListElement = trackListRef.current;
		if (trackListElement) {
			trackListElement.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (trackListElement) {
				trackListElement.removeEventListener('scroll', handleScroll);
			}
		};
	}, [page, PurchaseTrackList]);

	return isFetch && (
		<div 
			className="trackListWrap"
			ref={trackListRef}
		>
			<ul className="trackList">
				{visibleTracks.map((itemInfo, index) => (
					<li key={itemInfo.ID}>
						<AlbumTrackItem 
							albumTrackInfo={itemInfo} 
							AlbumTrackList={PurchaseTrackList} 
							position={index}
              type='purchase'
						/>
					</li>
				))}
			</ul>

			{/* 로딩 표시 */}
			{PurchaseTrackList && visibleTracks.length < PurchaseTrackList.length && (
				<div className="loading">Loading more tracks...</div>
			)}

			<style jsx>{`
				.trackListWrap {
					margin-top: 10px;
					max-height: calc(100vh - 200px);
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;

					.trackNum {
						padding: 10px 15px;
						font-size: 13px;
						position: sticky;
						top: 0;
						z-index: 1;
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
	);
};

export default PurchaseTrackList;
