"use client";

import style from "./button.module.css";

type Props = {
	method: string;
};

const FuncButton = ({ method }: Props) => {
	const funcClickAction = (type: string) => {
		const artistItem = {
			artist_id: "test1234",
			artist_name: "artist",
			thumbnail: "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
		};

		const WebStreamArtistItem: any[] = [artistItem];

		const trackItem = {
			track_id: "test1234",
			title: "test_track",
			album_thumbnail: "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
			thumbnail: "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
			url: "http://movie.cinehotel.co.kr/movie/111111.mkv",
			playable: "0000",
			media_type: "video",
			album_id: "album_1234",
			album_name: "test_album",
			artist: WebStreamArtistItem,
			duration: "",
			resolution: "",
			codec: "hevc/pcm_si6le",
		};

		const WebStreamTrackItem: any[] = [trackItem];

		const albumItem = {
			album_id: "album1234",
			album_name: "test_album",
			thumbnail: "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
			tracks: WebStreamTrackItem,
			artist: WebStreamArtistItem,
		};

		const WebStreamAlbumItem: any[] = [albumItem];

		const artistData = {
			WebStreamArtistItem: WebStreamArtistItem,
		};

		const trackData = {
			webstreamtrackitem: WebStreamTrackItem,
		};

		const albumData = {
			webstreamtrackitem: WebStreamAlbumItem,
		};

		let json_artist_data: string = JSON.stringify(artistData);
		let json_track_data: string = JSON.stringify(trackData);
		let json_album_data: string = JSON.stringify(albumData);

		// 버튼 클릭 시 실행할 로직
		if (type == "single") {
			//	(window as any).HifiRose.webStreamTrackMoreClick(json_track_data);
		} else if (type == "album") {
			//	(window as any).HifiRose.webStreamAlbumMoreClick(json_album_data);
		} else if (type == "track") {
			//	(window as any).HifiRose.webStreamArtistMoreClick(json_track_data);
		}
	};

	return (
		<>
			<button
				type="button"
				className={style.funcBtn}
				onClick={() => funcClickAction(method)}
			></button>
		</>
	);
};

export default FuncButton;
