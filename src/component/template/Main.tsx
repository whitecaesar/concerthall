"use client";
import TextBanner from "../organism/textBanner/TextBanner";
import ImageBanner from "../organism/imageBanner/ImageBanner";
import SingleList from "../organism/singleList/SingleList";
import AlbumList from "../organism/albumList/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import {
	ARTIST_INFO_TYPE,
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { useEffect, useState } from "react";
import {
	getRecentAlbumAxios,
	ALBUM_RECENT_LIST_RESPONSE,
} from "@/services/contents/RecentAlbumAxios";
import {
	getRecentPlayListAxios,
	PLAY_RECENT_LIST_RESPONSE,
} from "@/services/contents/RecentPlayListAxios";
import RecentAlbumList from "../organism/albumList/RecentAlbumList";
import RecentPlayList from "../organism/albumList/RecentPlayList";
import { TRACK_RECENT_LIST_RESPONSE, getRecentTrackListAxios } from "@/services/contents/RecentTrackListAxios";
import RecentTrackList from "../organism/singleList/RecentTrackList";

export default function Main() {

	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: () => {
			const list = getBannersAxios();
			return list;
		},
	});

	const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE>();
	const [recentPlayList, setRecentPlayList] = useState<PLAY_RECENT_LIST_RESPONSE>();
	const [recentTrackList, setRecentTrackList] = useState<TRACK_RECENT_LIST_RESPONSE>();
	useEffect(() => {
		// const recent = ;
			getRecentAlbumAxios("", 20).then((data) => setRecent(data));

			getRecentPlayListAxios("", 20).then((playdata) => setRecentPlayList(playdata));

			getRecentTrackListAxios("", 20).then((trackdata) =>	setRecentTrackList(trackdata));
	}, []);

	return (
		<>
			<ImageBanner list={data?.IMG_BANNER} isFetched={isFetched} />
			<TextBanner banner={data?.TXT_BANNER[0]} isFetched={isFetched} />

			{recentPlayList && (<RecentPlayList showTitle={true} recommendList={recentPlayList} />)}
			{recent && <RecentAlbumList showTitle={true} recommendList={recent} />}
			{recentTrackList && (<RecentTrackList showTitle={true} recommendList={recentTrackList} />)}

			{data?.RECOMMEND_LIST.map((content: VIEWALL_LIST_TYPE) => {
				return (
					<>
						{content.TYPE === "SINGLE" ? (
							<SingleList showTitle={true} recommendList={content} />
						) : (
							<AlbumList showTitle={true} recommendList={content} />
						)}
					</>
				);
			})}
		</>
	);
}



