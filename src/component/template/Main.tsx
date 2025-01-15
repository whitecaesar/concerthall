"use client";
import ImageBanner from "../organism/imageBanner/ImageBanner";
import SingleList from "../organism/singleList/SingleList";
import AlbumList from "../organism/albumList/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
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

	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: () => {
			const list = getBannersAxios();
			return list;
		},
	});

	//setCookie("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzI1OTQ1OTQ1LCJleHAiOjIwNDEzMDU5NDUsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJ1c2VybmFtZSI6IkphbWllIiwiaXNFbWFpbENvbmZpcm0iOnRydWUsImF1dGhvcml0aWVzIjpbIlJPU0VfTUVNQkVSIiwiUk9MRV9VU0VSX09OTElORSJdfQ.MAX2itEGOBE16A-VQnJGvO8Hunn45PBCi87Dr9n3B_YZuSUPC6S254FHQ5fjP8Z0Pj5uqmW07vvMQiu3CLW7WA", 24);

	const [recent, setRecent] = useState<ALBUM_RECENT_LIST_RESPONSE>();
	const [recentPlayList, setRecentPlayList] =
		useState<PLAY_RECENT_LIST_RESPONSE>();
	const [recentTrackList, setRecentTrackList] =
		useState<TRACK_RECENT_LIST_RESPONSE>();
	useEffect(() => {
		// const recent = ;

		getRecentAlbumAxios("", 20)
			.then((albumdata) => setRecent(albumdata))
			.catch((error) => {
				setError(error);
			});
		getRecentPlayListAxios("", 20)
			.then((playdata) => setRecentPlayList(playdata))
			.catch((error) => {
				setError(error);
			});
		getRecentTrackListAxios("", 20)
			.then((trackdata) => setRecentTrackList(trackdata))
			.catch((error) => {
				setError(error);
			});
	}, []);

	//팝업 관련
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleConfirm = () => {
		alert("확인 버튼 클릭!");
		setIsPopupOpen(false);
	};

	const handleCancel = () => {
		alert("취소 버튼 클릭!");
		setIsPopupOpen(false);
	};

	if (error) {
		return <ErrorPage></ErrorPage>;
	} else {
		return (
			<>
				<button onClick={() => setIsPopupOpen(true)}>팝업여는것</button>
				<Popup
					isOpen={isPopupOpen}
					onClose={() => setIsPopupOpen(false)}
					title="구매하기"
					description="ㅇㅇㅇ을 구매하시겠습니까?"
					buttons={[
						{ text: "취소", className: "cancel", onClick: handleCancel },
						{ text: "확인", className: "ok", onClick: handleConfirm },
					]}
				/>
				<ImageBanner list={data?.TOP_IMG_BANNER} isFetched={isFetched} />
				<TextBanner banner={data?.TOP_TXT_BANNER[0]} isFetched={isFetched} />

				{recentPlayList && (
					<RecentPlayList showTitle={true} recommendList={recentPlayList} />
				)}
				{recent && <RecentAlbumList showTitle={true} recommendList={recent} />}
				{recentTrackList && (
					<RecentTrackList showTitle={true} recommendList={recentTrackList} />
				)}
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
