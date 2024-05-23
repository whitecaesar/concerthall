// 해당 아티스트의 트랙 리스트
"use client";
import React from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import ArtistTrackItem from "@/component/molecule/artistTrackItem/ArtistTrackItem";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";

interface ArtistTrackListProps {
	trackList: ALBUM_DETAIL_TYPE;
}

const ArtistTrackList = ({ trackList }: ArtistTrackListProps) => {
	const AlbumTracks = trackList?.ITEM_INFO;
	return (
		<div className="ArtistTrackListWrap">
			<ItemListTitle.ViewAll
				isPresent={true}
				text="Top Tracks"
				href={""}
				onClick={() => {}}
			/>
			<ul className="trackList">
				{AlbumTracks.map((itemInfo) => (
					<li key={itemInfo.ID}>
						<ArtistTrackItem trackInfo={itemInfo} />
					</li>
				))}
			</ul>
			<style jsx>{`
				.ArtistTrackListWrap {
					margin-top: 10px;
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
	);
};

export default ArtistTrackList;
