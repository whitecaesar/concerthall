"use client";
import React, { useEffect, useState, useRef } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackItem from "@/component/molecule/trackItem/AlbumTrackItem";
import {STAR_TRACK_LIST_RESPONSE_TYPE, TRACK_REG_ITEM_TYPE, TRACK_REG_REQUEST_TYPE, TRACK_REG_RESPONSE_ITEM_TYPE, getRegCheckListAxios, getStarAxios, getStarTrackAxios, getStarTrackListAxios } from "@/services/contents/StarAxios";
import Popup from "@/component/atom/popup/Popup";
import { purchaseTexts } from "../menuList/MenuList";
import { getCookie } from "@/services/common";
import { useRouter } from "next/navigation";
import { setCancelAxios, setCitechCancelAxios } from "@/services/contents/PurchaseCancelAxios";

interface TrackListProps {
	PurchaseTrackList: ALBUM_ITEM_TYPE[];
}

const PurchaseTrackList = ({ PurchaseTrackList }: TrackListProps) => {
	const [isFetch, setIsFetch] = useState<boolean>(false);
	const [visibleTracks, setVisibleTracks] = useState<ALBUM_ITEM_TYPE[]>([]);
	const [page, setPage] = useState(0);
	const trackListRef = useRef<HTMLDivElement>(null);
	const ITEMS_PER_PAGE = 20;

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPaymentCancelOpen, setIsPaymentCancelOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("구매가 불가한 트랙입니다.");
	const [selectedTrack, setSelectedTrack] = useState<ALBUM_ITEM_TYPE | null>(null);

	const router = useRouter();
	const lang = getCookie("lang") || "en";
	const purchaseText = purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase;

	const handleConfirm = () => {
		setIsPopupOpen(false);
	};

	const handleCancel = () => {
		setIsPopupOpen(false);
	};

	const handleCancelOpen = (track: ALBUM_ITEM_TYPE) => {
		setSelectedTrack(track);
		setIsPaymentCancelOpen(true);
	};

	const handlePopupOpen = (message: string) => {
		setPopupDescription(message);
		setIsPopupOpen(true);
	};

	const handlePaymentCancel = async () => {
		if (!selectedTrack) return;
		// 구매 취소 처리
		const cancelResponse = await setCancelAxios(selectedTrack.PAYMENT_ID || '', {
			ID_CUST: getCookie('id_cust') || ''
		});
		if (cancelResponse.REG_CODE !== "0000") {
			setPopupDescription(`${cancelResponse.REG_MSG}`);
			setIsPopupOpen(true);
		}
		else {
			const roseCancelResponse = await setCitechCancelAxios({
				cpCode: 'test-01',
				appType: 'CONCERTHALL',
				purchaseId: selectedTrack.PAYMENT_ID || '',
				reason: 'SIMPLE_CHANGE_OF_MIND'
			});
			if (roseCancelResponse.code !== "200.1") {
				setPopupDescription(`${roseCancelResponse.message}`);
				setIsPopupOpen(true);
			}
			else {
				setPopupDescription(`Your purchase has been canceled.`);
				router.push(`/my/purchaseList?title=${purchaseText}`);
				setIsPopupOpen(true);
				setIsPaymentCancelOpen(false);
			}
		}
	};

	const handleClose = () => {
		setSelectedTrack(null);
		setIsPaymentCancelOpen(false);
	};

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
		const RegTrackItem: TRACK_REG_ITEM_TYPE[] = [];

		const promises =  PurchaseTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
			const trackItem = {
				mediaType : "CONCERT_HALL",
				clientKey : track.ID,
			};
			RegTrackItem.push(trackItem);
		});

		await Promise.all(promises);

		const RegTrackParam: TRACK_REG_REQUEST_TYPE = {
			tracks: RegTrackItem
		};

		const regList = await getRegCheckListAxios(RegTrackParam);
		if(regList.code === '200')
		{
			const roseId: any[] = [];
			const promises = regList.tracks.map(async (track: TRACK_REG_RESPONSE_ITEM_TYPE) => {
				if(track.id)
				{
					roseId.push(track.id);
				}
				else{
					roseId.push(0);
				}
			});

			await Promise.all(promises);
			const StarParam: STAR_TRACK_LIST_RESPONSE_TYPE = {
				ids : roseId
			};

			const starList = await getStarTrackListAxios(StarParam);
			if (regList.code === '200' && starList && Array.isArray(starList.data)) {
				const promises = PurchaseTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
					// 1. regList에서 track.ID와 일치하는 항목 찾기 (clientKey 기준)
					const regEntry = regList.tracks.find((entry: TRACK_REG_RESPONSE_ITEM_TYPE) => entry.clientKey === track.ID);
					// 2. regEntry의 id가 존재하면
					if (regEntry && regEntry.id) {
						// 3. starList.data에서 regEntry.id와 동일한 id를 가진 항목 찾기
						const starEntry = starList.data.find((item: any) => item.id === regEntry.id);
						// 4. 일치하는 항목이 있으면 해당 star 값을 할당, 없으면 0 할당
						if (starEntry) {
							track.STAR = starEntry.star;
						} else {
							track.STAR = 0;
						}
					} else {
						// regList에 일치하는 항목이 없거나 id가 null이면 바로 0 할당
						track.STAR = 0;
					}
				});
				await Promise.all(promises);
				setIsFetch(true);
			}
		}
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
							handleCancelOpen={handleCancelOpen}
							handlePopupOpen={handlePopupOpen}
              type='purchase'
						/>
					</li>
				))}
			</ul>

			{/* 로딩 표시 */}
			{PurchaseTrackList && visibleTracks.length < PurchaseTrackList.length && (
				<div className="loading">Loading more tracks...</div>
			)}

			<Popup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="INFOMATION"
				description={popupDescription}
				buttons={[{ text: "OK", className: "ok", onClick: handleConfirm }]}
			/>
			<Popup
				isOpen={isPaymentCancelOpen}
				onClose={() => setIsPaymentCancelOpen(false)}
				title="CANCEL"
				description="Would you like to cancel your purchase?"
				buttons={[{ text: "OK", className: "ok", onClick: handlePaymentCancel}, { text: "CANCEL", className: "cancel", onClick: handleClose }]}
			/>

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
