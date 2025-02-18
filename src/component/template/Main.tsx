"use client";
import ImageBanner from "../organism/imageBanner/ImageBanner";
import SingleList from "../organism/singleList/SingleList";
import AlbumList from "../organism/albumList/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import { recentTexts, RecentText } from "@/services/main/recentText";
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
import { setCookie, getCookie, deleteCookie } from "@/services/common";
import ErrorPage from "../organism/error/Error";
import Loading from "@/app/loading";
import Popup from "../atom/popup/Popup";
import Button from "../atom/button/Button";

export default function Main() {
	const [error, setError] = useState<string | null>(null);
	const [t, setT] = useState<string | null>(null);

	setCookie("userid", "mjkim@citech.kr", 24);
	const token = getCookie("token");

	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: () => {
			const list = getBannersAxios();
			return list;
		},
	});

	const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE>();
	const [recentPlayList, setRecentPlayList] = useState<PLAY_RECENT_LIST_RESPONSE>();
	const [recentTrackList, setRecentTrackList] =	useState<TRACK_RECENT_LIST_RESPONSE>();

	const [playTxt, setPlayTxt] = useState<string>(recentTexts.en.play);
	const [albumTxt, setAlbumTxt] = useState<string>(recentTexts.en.album);
	const [trackTxt, setTrackTxt] = useState<string>(recentTexts.en.track);

	useEffect(() => {
		const lang = getCookie("lang") || "en"; // 기본값을 en으로 설정
		setPlayTxt(recentTexts[lang]?.play || recentTexts.en.play);
		setAlbumTxt(recentTexts[lang]?.album || recentTexts.en.album);
		setTrackTxt(recentTexts[lang]?.track || recentTexts.en.track);
	}, [recentTexts]);

	useEffect(() => {
		// const recent = ;
		getRecentAlbumAxios("", 0, 10)
			.then((albumdata) => setRecent(albumdata))
			.catch((error) => {
				//setError(error);
			});
		getRecentPlayListAxios("", 0, 10)
			.then((playdata) => setRecentPlayList(playdata))
			.catch((error) => {
				//setError(error);
			});
		getRecentTrackListAxios("", 0, 10)
			.then((trackdata) => setRecentTrackList(trackdata))
			.catch((error) => {
				//setError(error);
			});
	}, []);

if (error) {
		return <ErrorPage></ErrorPage>;
	} else {
		return (
			<>
				<div>현재토큰 : {token}</div>
				<ImageBanner list={data?.TOP_IMG_BANNER} isFetched={isFetched} />
				<TextBanner banner={data?.TOP_TXT_BANNER[0]} isFetched={isFetched} />

				{recentPlayList && (<RecentPlayList showTitle={true} recommendList={recentPlayList} title={playTxt} />)}
				{recent && <RecentAlbumList showTitle={true} recommendList={recent} title={albumTxt}/>}
				{recentTrackList && (<RecentTrackList showTitle={true} recommendList={recentTrackList} title={trackTxt}/>)}

				<ImageBanner list={data?.IMG_BANNER} isFetched={isFetched} />

				{data?.RECOMMEND_LIST.map((content: VIEWALL_LIST_TYPE) => {
					return (
						<>
							{content.TYPE == "TRACK" ? (
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
}
