"use client";
import React, { useEffect, useState } from "react";
import style from "./likeList.module.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { getAlbumAxios } from "@/services/contents/AlbumAxios";
import { useQuery } from "@tanstack/react-query";
import AlbumViewAll from "@/component/template/AlbumViewAll";
import TrackList from "@/component/organism/trackList/TrackList";
import { TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
import { getLikeTrackListAxios } from "@/services/contents/LikeTrackListAxios";
import RecentTrackList from "../singleList/RecentTrackList";
import RCTTrackList from "../trackList/RCTTrackList";
import { ALBUM_LIKE_LIST_RESPONSE, getLikeAlbumListAxios } from "@/services/contents/LikeAlbumListAxios";
import LikeAlbumList from "../albumList/LikeAlbumList";

type Props = {};
interface AlbumTrackProps {
	album_id: string;
}
export default function LikeList(album: AlbumTrackProps, props: Props) {
	const [activeTab, setActiveTab] = useState<string>("Tab1");
	const [trackList, setTrackList] = useState<TRACK_RECENT_LIST_RESPONSE>();
	const [AlbumList, setAlubmList] = useState<ALBUM_LIKE_LIST_RESPONSE>();
	//const [ArtistList, setArtistList] = useState<TRACK_RECENT_LIST_RESPONSE>();
	//const [PlayList, setRecentTrackList] = useState<TRACK_RECENT_LIST_RESPONSE>();

	useEffect(() => {
		// const recent = ;
		getLikeTrackListAxios().then((data) => setTrackList(data));
		getLikeAlbumListAxios().then((data) => setAlubmList(data));
	}, []);

	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
	};

	return (
		<>
			<SubTitleProvider>
				<div className={style.tab}>
					<button
						className={activeTab === "Tab1" ? style.active : ""}
						onClick={() => handleTabClick("Tab1")}
					>
						Tracks({trackList?.totalCount})
					</button>
					<button
						className={activeTab === "Tab2" ? style.active : ""}
						onClick={() => handleTabClick("Tab2")}
					>
						Albums({AlbumList?.totalCount})
					</button>
					<button
						className={activeTab === "Tab3" ? style.active : ""}
						onClick={() => handleTabClick("Tab3")}
					>
						Artist(2)
					</button>
					<button
						className={activeTab === "Tab4" ? style.active : ""}
						onClick={() => handleTabClick("Tab4")}
					>
						Playlist(2)
					</button>
				</div>


				<div className={style.tabContent}>
					{activeTab === "Tab1" && (
						<div>
							{trackList && <RCTTrackList trackList={trackList}/>}
						</div>
					)}
					{activeTab === "Tab2" && (
						<div>
							{AlbumList && <LikeAlbumList likeAlbumList={AlbumList}/>}
						</div>
					)}
					{activeTab === "Tab3" && (
						<div>

						</div>
					)}
					{activeTab === "Tab4" && (
						<div>
							
						</div>
					)}
				</div>
			</SubTitleProvider>
		</>
	);
}
