import axios, { AxiosResponse } from "axios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzExNTAzMDA0LCJleHAiOjIwMjY4NjMwMDQsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJyb3NldHViZVJlY2VudFBsYXlsaXN0IjoxNTUwNCwidXNlcm5hbWUiOiJKYW1pZSIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.3ZLPsp98wTCgMOChwwm2XtzRhKO7bMih556OtA6tnzvWAM_xSUSFtdMrlXCZR0k5142qpG3Cxd1L33qkRkPAaw"; // 동적으로 토큰을 얻는 로직

export type TRACK_ITME_ARTIST_TYPE = {
    albums_count : string;
    favCnt : number;
    id : string;
    name : string;    
}

export type TRACK_ITEM_IMAGE_TYPE = {
    large : string;
    small : string;
    thumbnail : string;
}

export type TRACK_ITEM_LABEL_TYPE = {
    albums_count : string;
    id : string;
    name : string;
}

export type TRACK_ITEM_ALBUM_TYPE = {
    artist : TRACK_ITME_ARTIST_TYPE;
    duration : string;
    favCnt : string;
    hires : string;
    hires_streamable : string;
    id : string;
    image : TRACK_ITEM_IMAGE_TYPE;
    label : TRACK_ITEM_LABEL_TYPE;
    maximum_bit_depth : string;
    maximum_channel_count : string;
    maximum_sampling_rate : string;
    release_date_original : string;
    release_date_stream : string;
    streamable : boolean;
    title : string;
    tracks_count : string;
}

export type TRACK_ITEM_COMPOSER_TYPE = {
    id : string;
    name : string;
}

export type TRACK_ITEM_PERFORMER = {
    id : string;
    name : string;
}

export type TRACK_ITEM_DATA_TYPE = {
    album : TRACK_ITEM_ALBUM_TYPE;
    composer : TRACK_ITEM_COMPOSER_TYPE;
    copyright : string;
    duration : string;
    favCnt : number;
    hires : boolean;
    hires_streamable : boolean;
    id : string;
    maximum_bit_depth : string;
    maximum_sampling_rate : string;
    media_number : number;
    parental_warning : boolean;
    performer : TRACK_ITEM_PERFORMER;
    performers : string;
    previewable : boolean;
    purchasable : boolean;
    qobuz_id : number;
    sampleable : boolean;
    streamable : boolean;
    title : string;
    track_number : number;
}

export type PLAYLIST_TRACK_ITEM_TYPE = {
	id: string;
    title: string;
	type: string;
	sort: number;
    favorite: string;
    arists: string[];
    ownerId: number;
    ownerName:string;
    star: number;
	comment: string;
    thumbnailUrl: string;
    playUrl : string;
    clientKey : string;
    duration : number;
    playTime : string;
    playCount : number
    data? : TRACK_ITEM_DATA_TYPE;
    albumString : string;
    artistsString : string;
    genresSTring: string;
};

export type TRACK_PLAYLIST_ITEM_TYPE = {
	id: string;
    title: string;
	type: string;
    star: number;
    share: string;
    ownerId: number;
    ownerName:string;
    favoriteTrack?:boolean;
    favorite: string;
    thumbup : boolean;
    thumbupCount : number;
	trackCount: string;
    thumbnail: string;
    tag: [];
    sort?: number;
    registDateTime : string;
    comment : string;
    clientKey : string;
    tracks : PLAYLIST_TRACK_ITEM_TYPE[];
    isRose : boolean;
};

export type TRACK_LIST_RESPONSE = {
	message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    playlist: TRACK_PLAYLIST_ITEM_TYPE;
};

export async function getPlayListTrackListAxios(
	playlistId: string,
	size:number // idAlbum 파라미터를 추가했습니다.
): Promise<TRACK_LIST_RESPONSE> {
	const response: AxiosResponse<TRACK_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/playlist/${playlistId}?page=0&size=${size}`,{
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}


