"use client";
import React, { useEffect, useState } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, STAR_TRACK_LIST_RESPONSE_TYPE, STAR_TRACK_REQUEST_TYPE, TRACK_REG_ITEM_TYPE, TRACK_REG_REQUEST_TYPE, TRACK_REG_RESPONSE_ITEM_TYPE, getRegCheckListAxios, getStarAxios, getStarTrackAxios, getStarTrackListAxios } from "@/services/contents/StarAxios";
import ArtistTrackItem from "@/component/molecule/artistTrackItem/ArtistTrackItem";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";

interface ArtistTrackListProps {
	ArtistTrackList: ALBUM_ITEM_TYPE[];
}

const ArtistTrackList = ({ ArtistTrackList }: ArtistTrackListProps) => {
	const [isFetch, setIsFetch] = useState<boolean>(false);

	useEffect(() => {
			fetchStarRatings();
	}, [ArtistTrackList]);

	const fetchStarRatings = async () => {
		const RegTrackItem: TRACK_REG_ITEM_TYPE[] = [];

		const promises = ArtistTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
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
				const promises = ArtistTrackList.map(async (track: ALBUM_ITEM_TYPE) => {
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


	return isFetch && <div className="trackListWrap">
		{ArtistTrackList && (
			<ItemListTitle.ViewAll
				isPresent={false}
				text='아티스트 트랙'
				count={ArtistTrackList.length}
			/>
		)}
		{/*
		<div className="trackNum">
			<span>{ArtistTrackList.length} Tracks</span>
		</div>
		*/}
		<ul className="trackList">
			{ArtistTrackList.map((itemInfo, index) => {
				return (
					<li key={itemInfo.ID}>
						<ArtistTrackItem ArtistTrackInfo={itemInfo} ArtistTrackList={ArtistTrackList} position={index}/>
					</li>)
			})}
		</ul>
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
			}
		`}</style>
	</div>

};

export default ArtistTrackList;
