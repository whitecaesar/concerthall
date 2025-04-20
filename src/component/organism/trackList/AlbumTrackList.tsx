"use client";
import React, { useEffect, useState, useRef } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackItem from "@/component/molecule/trackItem/AlbumTrackItem";
import {
	STAR_TRACK_LIST_RESPONSE_TYPE,
	TRACK_REG_ITEM_TYPE,
	TRACK_REG_REQUEST_TYPE,
	TRACK_REG_RESPONSE_ITEM_TYPE,
	getRegCheckListAxios,
	getStarTrackListAxios,
} from "@/services/contents/StarAxios";
import Payment from "@/component/organism/payment/payment";
import { generateClientRandomString } from "@/services/common";
import { useRouter } from "next/navigation";
import { purchaseTexts } from "../menuList/MenuList";
import { getCookie } from "@/services/common";
import Popup from "@/component/atom/popup/Popup";

interface TrackListProps {
	AlbumTrackList: ALBUM_ITEM_TYPE[];
	type?: string;
}

const AlbumTrackList = ({ AlbumTrackList, type }: TrackListProps) => {
	const [isFetch, setIsFetch] = useState<boolean>(false);
	const [visibleTracks, setVisibleTracks] = useState<ALBUM_ITEM_TYPE[]>([]);
	const [page, setPage] = useState(0);
	const trackListRef = useRef<HTMLDivElement>(null);
	const ITEMS_PER_PAGE = 20;

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("구매가 불가한 트랙입니다.");
	const [selectedTrack, setSelectedTrack] = useState<ALBUM_ITEM_TYPE | null>(null);

	const id_key = generateClientRandomString();
	const router = useRouter();

	const lang = getCookie("lang") || "en";
	const purchaseText = purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase;

	const handlePaymentOpen = (track: ALBUM_ITEM_TYPE) => {
		setSelectedTrack(track);
		setIsPaymentOpen(true);
	};

	const handlePurchaseComplete = () => {
		if (typeof window !== 'undefined') {
			router.push(`/my/purchaseList?title=${purchaseText}`);
		}
	};

	const handlePopupOpen = (message: string) => {
		setPopupDescription(message);
		setIsPopupOpen(true);
	};

	const handleError = (message: string) => {
		handlePopupOpen(message);
	};

	const handleConfirm = () => {
		setIsPopupOpen(false);
	};

	useEffect(() => {
		fetchStarRatings();
	}, [AlbumTrackList]);

	// 초기 트랙 로드 및 star ratings 설정 후 visible tracks 업데이트
	useEffect(() => {
		if (isFetch && AlbumTrackList) {
			setPage(0);
			setVisibleTracks(AlbumTrackList.slice(0, ITEMS_PER_PAGE));
		}
	}, [isFetch, AlbumTrackList]);

	const fetchStarRatings = async () => {
		const RegTrackItem: TRACK_REG_ITEM_TYPE[] = [];

		const promises = AlbumTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
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
				const promises = AlbumTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
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

				if (AlbumTrackList && start < AlbumTrackList.length) {
					const newTracks = AlbumTrackList.slice(0, end);
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
			trackListElement.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (trackListElement) {
				trackListElement.removeEventListener("scroll", handleScroll);
			}
		};
	}, [page, AlbumTrackList]);

	return (
		isFetch && (
			<div className="trackListWrap" ref={trackListRef}>
				<div className="trackNum">
					<span>{AlbumTrackList.length} Tracks</span>
					{/*<button className="btnPaymentCancel">Not for sale</button>*/}
				</div>
				<ul className="trackList">
					{visibleTracks.map((itemInfo, index) => (
						<li key={itemInfo.ID}>
							<AlbumTrackItem
								albumTrackInfo={itemInfo}
								AlbumTrackList={AlbumTrackList}
								position={index}
								handlePaymentOpen={handlePaymentOpen}
								handlePopupOpen={handlePopupOpen}
							/>
						</li>
					))}
				</ul>

				{/* 로딩 표시 */}
				{AlbumTrackList && visibleTracks.length < AlbumTrackList.length && (
					<div className="loading">Loading more tracks...</div>
				)}

				<Payment
					isOpen={isPaymentOpen}
					onClose={() => setIsPaymentOpen(false)}
					trackId={selectedTrack?.ID}
					price={selectedTrack?.PRICE}
					idKey={id_key}
					type="track"
					onPurchaseComplete={handlePurchaseComplete}
					onError={handleError}
				/>

				<Popup
					isOpen={isPopupOpen}
					onClose={() => setIsPopupOpen(false)}
					title="INFOMATION"
					description={popupDescription}
					buttons={[{ text: "OK", className: "ok", onClick: handleConfirm }]}
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
							display: flex;
							align-items: center;
							justify-content: space-between;
						}
						.btnPaymentCancel {
							color: #ac8357;
							font-size: 13px;
							border-bottom: 1px solid #5e472e;
							margin-right: 5px;
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
		)
	);
};

export default AlbumTrackList;
