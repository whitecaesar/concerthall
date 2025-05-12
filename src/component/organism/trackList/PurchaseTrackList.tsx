"use client";
import React, { useEffect, useState, useRef, TouchEvent } from "react";
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
	const trackListRef = useRef<HTMLDivElement>(null);
	const [isPurchaseCancel, setIsPurchaseCancel] = useState(false);
	const touchStartY = useRef<number | null>(null);

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPaymentCancelOpen, setIsPaymentCancelOpen] = useState(false);
	const [popupDescription, setPopupDescription] = useState("구매가 불가한 트랙입니다.");
	const [selectedTrack, setSelectedTrack] = useState<ALBUM_ITEM_TYPE | null>(null);

	const router = useRouter();
	const lang = getCookie("lang") || "en";
	const purchaseText = purchaseTexts[lang]?.purchase || purchaseTexts.en.purchase;

	const handleConfirm = () => {
		setIsPopupOpen(false);
		if (isPurchaseCancel) {
			window.location.reload(); // 페이지 리로드로 대체
		}
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
		const id_cust = getCookie('userid') || '';	
		const cancelResponse = await setCancelAxios(selectedTrack.PAYMENT_ID || '', {
			ID_CUST: id_cust
		});
		if (cancelResponse.RES_CODE !== "0000") {
			setPopupDescription(`${cancelResponse.RES_MSG}`);
			setIsPopupOpen(true);
		} else {
			const roseCancelResponse = await setCitechCancelAxios({
				cpCode: 'test-01',
				appType: 'CONCERTHALL',
				purchaseId: selectedTrack.PAYMENT_ID || '',
				reason: 'SIMPLE_CHANGE_OF_MIND'
			});
			if (roseCancelResponse.code !== "200.1") {
				setPopupDescription(`${roseCancelResponse.message}`);
				setIsPopupOpen(true);
			} else {
				setPopupDescription(`Your purchase has been canceled.`);
				setIsPurchaseCancel(true);
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
			setVisibleTracks(PurchaseTrackList); // 모든 트랙을 표시
		}
	}, [isFetch, PurchaseTrackList]);

	const fetchStarRatings = async () => {
		const RegTrackItem: TRACK_REG_ITEM_TYPE[] = [];

		const promises = PurchaseTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
			const trackItem = {
				mediaType: "CONCERT_HALL",
				clientKey: track.ID,
			};
			RegTrackItem.push(trackItem);
		});

		await Promise.all(promises);

		const RegTrackParam: TRACK_REG_REQUEST_TYPE = {
			tracks: RegTrackItem
		};

		const regList = await getRegCheckListAxios(RegTrackParam);
		if (regList.code === '200') {
			const roseId: any[] = [];
			const promises = regList.tracks.map(async (track: TRACK_REG_RESPONSE_ITEM_TYPE) => {
				if (track.id) {
					roseId.push(track.id);
				} else {
					roseId.push(0);
				}
			});

			await Promise.all(promises);
			const StarParam: STAR_TRACK_LIST_RESPONSE_TYPE = {
				ids: roseId
			};

			const starList = await getStarTrackListAxios(StarParam);
			if (regList.code === '200' && starList && Array.isArray(starList.data)) {
				const promises = PurchaseTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
					const regEntry = regList.tracks.find((entry: TRACK_REG_RESPONSE_ITEM_TYPE) => entry.clientKey === track.ID);
					if (regEntry && regEntry.id) {
						const starEntry = starList.data.find((item: any) => item.id === regEntry.id);
						if (starEntry) {
							track.STAR = starEntry.star;
						} else {
							track.STAR = 0;
						}
					} else {
						track.STAR = 0;
					}
				});
				await Promise.all(promises);
				setIsFetch(true);
			}
		}
	};

	
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
							handleCancelOpen={handleCancelOpen}
							handlePopupOpen={handlePopupOpen}
							type='purchase'
							position={index}
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

					.trackNum {
						padding: 10px 15px;
						font-size: 13px;
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
