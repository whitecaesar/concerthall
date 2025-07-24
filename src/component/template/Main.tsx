"use client";
import ImageBanner from "../organism/imageBanner/ImageBanner";
import SingleList from "../organism/singleList/SingleList";
import AlbumList from "../organism/albumList/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import { recentTexts } from "@/services/main/recentText";
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
import {
	TRACK_RECENT_LIST_RESPONSE,
	getRecentTrackListAxios,
} from "@/services/contents/RecentTrackListAxios";
import RecentTrackList from "../organism/singleList/RecentTrackList";
import TextBanner from "../organism/textBanner/TextBanner";
import { getCookie, setCookie } from "@/services/common";
import ErrorPage from "../organism/error/Error";

export default function Main() {
	const [error, setError] = useState<string | null>(null);

	//setCookie("userid", "3029", 24);
	const token = getCookie("token") || "";


	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: async () => {
			try {
				const list = await getBannersAxios();
				return list;
			} catch (err) {
				console.error('Error fetching banners:', err);
				return null;
			}
		},
	});

	const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE | null>(null);
	const [recentPlayList, setRecentPlayList] = useState<PLAY_RECENT_LIST_RESPONSE | null>(null);
	const [recentTrackList, setRecentTrackList] = useState<TRACK_RECENT_LIST_RESPONSE | null>(null);

	const [playTxt, setPlayTxt] = useState<string>(recentTexts.en.play);
	const [albumTxt, setAlbumTxt] = useState<string>(recentTexts.en.album);
	const [trackTxt, setTrackTxt] = useState<string>(recentTexts.en.track);

	useEffect(() => {
		const lang = getCookie("lang") || "en"; // 기본값을 en으로 설정
		setPlayTxt(recentTexts[lang as keyof typeof recentTexts]?.play || recentTexts.en.play);
		setAlbumTxt(recentTexts[lang as keyof typeof recentTexts]?.album || recentTexts.en.album);
		setTrackTxt(recentTexts[lang as keyof typeof recentTexts]?.track || recentTexts.en.track);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const albumData = await getRecentAlbumAxios("", 0, 10);
				setRecent(albumData);
			} catch (err) {
				console.error('Error fetching recent albums:', err);
			}

			try {
				const playData = await getRecentPlayListAxios("", 0, 10);
				setRecentPlayList(playData);
			} catch (err) {
				console.error('Error fetching recent playlists:', err);
			}

			try {
				const trackData = await getRecentTrackListAxios("", 0, 10);
				setRecentTrackList(trackData);
			} catch (err) {
				console.error('Error fetching recent tracks:', err);
			}
		};

		fetchData();
	}, []);

	if (error) {
		return <ErrorPage />;
	}

	return (
		<>
		
		<ImageBanner list={data?.TOP_IMG_BANNER} isFetched={isFetched} />
			{data?.TOP_TXT_BANNER && data.TOP_TXT_BANNER.length > 0 && (
				<TextBanner banner={data.TOP_TXT_BANNER[0]} isFetched={isFetched} />
			)}

			{recentPlayList && (<RecentPlayList showTitle={true} recommendList={recentPlayList} title={playTxt} />)}
			{recent && <RecentAlbumList showTitle={true} recommendList={recent} title={albumTxt}/>}
			{recentTrackList && (<RecentTrackList showTitle={true} recommendList={recentTrackList} title={trackTxt}/>)}

			<ImageBanner list={data?.IMG_BANNER} isFetched={isFetched} />

			{data?.RECOMMEND_LIST && data.RECOMMEND_LIST.map((content: VIEWALL_LIST_TYPE, index: number) => (
				<div key={index}>
					{content.TYPE === "TRACK" ? (
						<SingleList showTitle={true} recommendList={content} />
					) : (
						<AlbumList showTitle={true} recommendList={content} />
					)}
				</div>
			))}

		</>
	);
}
