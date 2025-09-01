"use client";
import React, { useEffect, useState } from "react";
import style from "./likeList.module.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { TRACK_RECENT_LIST_RESPONSE } from "@/services/contents/RecentTrackListAxios";
import { getLikeTrackListAxios } from "@/services/contents/LikeTrackListAxios";
import RCTTrackList from "../trackList/RCTTrackList";
import { ALBUM_LIKE_LIST_RESPONSE, getLikeAlbumListAxios } from "@/services/contents/LikeAlbumListAxios";
import LikeAlbumList from "../albumList/LikeAlbumList";
import MyPlayViewAll from "../albumList/LikePlayList";
import { MY_RECENT_LIST_RESPONSE, getLikePlayListAxios } from "@/services/contents/LikePlayListAxios";
import { ARTIST_LIST_RESPONSE_TYPE, getArtistListAxios } from "@/services/contents/LikeArtistAxios";
import ArtistListViewAll from "../artistList/ArtistListViewAll";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

export default function LikeList(props: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	
	// URL에서 tab 파라미터 읽기 (없으면 기본값 "Tab1" 사용)
	const tabParam = searchParams.get('tab');
	const [activeTab, setActiveTab] = useState<string>(tabParam || "Tab1");
	
	const [trackList, setTrackList] = useState<TRACK_RECENT_LIST_RESPONSE>();
	const [AlbumList, setAlubmList] = useState<ALBUM_LIKE_LIST_RESPONSE>();
	const [ArtistList, setArtistList] = useState<ARTIST_LIST_RESPONSE_TYPE>();
	const [PlayList, setPlayList] = useState<MY_RECENT_LIST_RESPONSE>();

	useEffect(() => {
		// const recent = ;
		getLikeTrackListAxios().then((data) => setTrackList(data));
		getLikeAlbumListAxios().then((data) => setAlubmList(data));
		getLikePlayListAxios().then((data) => setPlayList(data));
		getArtistListAxios().then((data) => setArtistList(data));
	}, []);
	
	// URL 파라미터 변경 시 탭 업데이트
	useEffect(() => {
		if (tabParam) {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
		
		// URL 쿼리 파라미터 업데이트
		const url = new URL(window.location.href);
		url.searchParams.set('tab', tabName);
		router.replace(url.pathname + url.search);
	};

	return (
		<>
			<SubTitleProvider>
				<div className={style.tab}>
					{trackList?.totalCount != 0 && (
						<button
							className={activeTab === "Tab1" ? style.active : ""}
							onClick={() => handleTabClick("Tab1")}
						>
							Tracks({trackList?.totalCount})
						</button>
					)}
					{AlbumList?.totalCount != 0 && (
						<button
							className={activeTab === "Tab2" ? style.active : ""}
							onClick={() => handleTabClick("Tab2")}
						>
							Albums({AlbumList?.totalCount})
						</button>
					)}
					{ArtistList?.totalCount != 0 && (
						<button
							className={activeTab === "Tab3" ? style.active : ""}
							onClick={() => handleTabClick("Tab3")}
						>
							Artist({ArtistList?.totalCount})
						</button>
					)}
					{PlayList?.totalCount != 0 && (
						<button
							className={activeTab === "Tab4" ? style.active : ""}
							onClick={() => handleTabClick("Tab4")}
						>
							Playlist({PlayList?.totalCount})
						</button>
					)}
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
							{ArtistList && <ArtistListViewAll viewAllList={ArtistList} />}
						</div>
					)}
					{activeTab === "Tab4" && (
						<div>
							{PlayList && <MyPlayViewAll totalCnt={PlayList.totalCount}/>}
						</div>
					)}
				</div>
			</SubTitleProvider>
		</>
	);
}
