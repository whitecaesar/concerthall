"use client";
import React, { useState } from "react";
import style from "./likeList.module.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { getAlbumAxios } from "@/services/contents/AlbumAxios";
import { useQuery } from "@tanstack/react-query";
import AlbumViewAll from "@/component/template/AlbumViewAll";
import TrackList from "@/component/organism/trackList/TrackList";
import ArtistViewAll from "@/component/template/ArtistViewAll";

type Props = {};
interface AlbumTrackProps {
	album_id: string;
}
export default function LikeList(album: AlbumTrackProps, props: Props) {
	//탭 기능
	const [activeTab, setActiveTab] = useState<string>("Tab1");
	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
	};

	const { data, isError, isLoading } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: () => {
			const TrackList = getAlbumAxios(album.album_id);
			return TrackList;
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError || !data) return <div>Error occurred</div>;

	const AlbumItem = data?.LIST[0];

	return (
		<>
			<SubTitleProvider>
				<div className={style.tab}>
					<button
						className={activeTab === "Tab1" ? style.active : ""}
						onClick={() => handleTabClick("Tab1")}
					>
						Tracks(25)
					</button>
					<button
						className={activeTab === "Tab2" ? style.active : ""}
						onClick={() => handleTabClick("Tab2")}
					>
						Albums(2)
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
					{activeTab === "Tab1" && <TrackList trackList={AlbumItem} />}
					{activeTab === "Tab2" && <AlbumViewAll />}
					{activeTab === "Tab3" && <ArtistViewAll />}
					{activeTab === "Tab4" && <AlbumViewAll />}
				</div>
			</SubTitleProvider>
		</>
	);
}
