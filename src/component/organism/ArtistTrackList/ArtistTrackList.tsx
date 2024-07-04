"use client";
import React, { useEffect, useState } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, STAR_TRACK_REQUEST_TYPE, getStarAxios, getStarTrackAxios } from "@/services/contents/StarAxios";
import ArtistTrackItem from "@/component/molecule/artistTrackItem/ArtistTrackItem";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";

interface ArtistTrackListProps {
	ArtistTrackList: ALBUM_ITEM_TYPE[];
}

const ArtistTrackList = ({ ArtistTrackList }: ArtistTrackListProps) => {
	const [isFetch, setIsFetch] = useState<boolean>(false);

	function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:number) {
		const item = ArtistTrackList.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

    useEffect(() => {
        fetchStarRatings();
    }, [ArtistTrackList]);

    const fetchStarRatings = async () => {
        ArtistTrackList.map(async (track :ALBUM_ITEM_TYPE) => {
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
				} else {
					addPropertyToItemInfo(track.ID, 'STAR', 0);
				}
				setIsFetch(true);
			} catch (error) {
				console.error('Error fetching star rating', error);
				addPropertyToItemInfo(track.ID, 'STAR', 0);
			}
        });
    };

	function setSubTitle(arg0: string) {
		throw new Error("Function not implemented.");
	}
	
	return isFetch && <div className="trackListWrap">
		{ArtistTrackList && (
			<ItemListTitle.ViewAll
				isPresent={false}
				text='아티스트 트랙'
				count={ArtistTrackList.length}
				onClick={() => {
					
				}}
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
