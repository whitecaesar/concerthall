"use client";
const RoundPlayButton = () => {
	const playClick = () => {
		// 버튼 클릭 시 실행할 로직

		const atistItem: { key: string; value: string }[] = [
			{ key: "artist_id", value: "test1234" },
			{ key: "artist_name", value: "artist" },
			{
				key: "thumbnail",
				value: "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
			},
		];

		const trackData: { codec: string } = {
			codec: "hevc/pcm_si6le",
		};

		let data: string = JSON.stringify(trackData);

		const trackItem: { key: string; value: any }[] = [
			{ key: "track_id", value: "test1234" },
			{ key: "title", value: "test_track" },
			{
				key: "thunbnail",
				value: "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
			},
			{ key: "url", value: "http://movie.cinehotel.co.kr/movie/111111.mkv" },
			{ key: "playable", value: "0000" },
			{ key: "media_type", value: "video" },
			{ key: "album_id", value: "album_1234" },
			{ key: "album_name", value: "test_album" },
			{ key: "artist", value: atistItem },
			{ key: "data", value: data },
		];
		console.log(trackItem);

		(window as any).HifiRose.webStreamTrackClick(trackItem, 1);
		//(window as any).HifiRose.webStreamTrackClick();

		console.log("트랙 처음부터 재생");
	};

	return (
		<>
			<button
				type="button"
				className="trackPlayBtn"
				onClick={playClick}
			></button>
			<style jsx>{`
				.trackPlayBtn {
					display: inline-block;
					width: 56px;
					height: 56px;
					background: url(/images/icon/png/icon_track_play.png) center center
						no-repeat;
					background-size: contain;
					margin-left: 12px;
				}
			`}</style>
		</>
	);
};

export default RoundPlayButton;
