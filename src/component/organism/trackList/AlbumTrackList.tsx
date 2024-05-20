"use client";
import React, { useEffect, useState } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import AlbumTrackItem from "@/component/molecule/trackItem/AlbumTrackItem";
import { STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, STAR_TRACK_REQUEST_TYPE, getStarAxios, getStarTrackAxios } from "@/services/contents/StarAxios";

interface TrackListProps {
	AlbumTrackList: ALBUM_ITEM_TYPE[];
}

const AlbumTrackList = ({ AlbumTrackList }: TrackListProps) => {
	const [isFetch, setIsFetch] = useState<boolean>(false);

	function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:number) {
		const item = AlbumTrackList.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

    useEffect(() => {
        fetchStarRatings();
    }, [AlbumTrackList]);

    const fetchStarRatings = async () => {
        AlbumTrackList.map(async (track :ALBUM_ITEM_TYPE) => {
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
					addPropertyToItemInfo(track.ID, 'STAR', response.code === '200' ? response.contents[0].star: 0);
					setIsFetch(true);
				} else {
					addPropertyToItemInfo(track.ID, 'STAR', 0);
				}
			} catch (error) {
			console.error('Error fetching star rating', error);
				addPropertyToItemInfo(track.ID, 'STAR', 0);
			}
        });
    };

	return isFetch && <div className="trackListWrap">
		<div className="trackNum">
			<span>{AlbumTrackList.length} Tracks</span>
		</div>
		<ul className="trackList">
			{AlbumTrackList.map((itemInfo, index) => {
				return (
					<li key={itemInfo.ID}>
						<AlbumTrackItem albumTrackInfo={itemInfo} />
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

export default AlbumTrackList;
