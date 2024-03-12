import React from "react";

const RoundPlayButton = () => {
	const playClick = () => {
		// 버튼 클릭 시 실행할 로직

		const artistItem = {
			artist_id : "test1234" ,
			artist_name : "artist" ,
			thumbnail : "http://cip.ontown.co.kr/images/dummy/dummy_single.png"
		};

		const WebStreamArtistItem: any[] = [artistItem];

		const trackItem = {
			track_id : "test1234",
			title : "test_track",
			thumbnail : "http://cip.ontown.co.kr/images/dummy/dummy_single.png",
			url : "http://movie.cinehotel.co.kr/movie/111111.mkv",
			playable : "0000",
			media_type : "video",
			album_id : "album_1234",
			album_name : "test_album",
			artist : WebStreamArtistItem,
			duration : "",
			resolution : "",
			codec : "hevc/pcm_si6le",
		};

		const WebStreamTrackItem: any[] = [trackItem];

		const playData = {
			webstreamtrackitem : WebStreamTrackItem
		}

		let data: string = JSON.stringify(playData);
		console.log(data);

//		const jsonArray = JSON.parse(data);
//		console.log(jsonArray);

		(window as any).HifiRose.webStreamTrackClick(data);
		//(window as any).HifiRose.webStreamTrackClick();

		//console.log("트랙 처음부터 재생");
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


