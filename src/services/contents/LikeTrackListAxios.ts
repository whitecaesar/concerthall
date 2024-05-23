import axios, { AxiosResponse } from "axios";
import { TRACK_TRACKS_ITEM_TYPE } from "./PlayListTrackAxios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzExNTAzMDA0LCJleHAiOjIwMjY4NjMwMDQsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJyb3NldHViZVJlY2VudFBsYXlsaXN0IjoxNTUwNCwidXNlcm5hbWUiOiJKYW1pZSIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.3ZLPsp98wTCgMOChwwm2XtzRhKO7bMih556OtA6tnzvWAM_xSUSFtdMrlXCZR0k5142qpG3Cxd1L33qkRkPAaw"; // 동적으로 토큰을 얻는 로직

export type TRACK_RECENT_ITME_ARTIST_TYPE = {
    albums_count : string;
    id : string;
    name : string;    
}

export type TRACK_RECENT_ITEM_IMAGE_TYPE = {
    large : string;
    small : string;
    thumbnail : string;
}

export type TRACK_RECENT_ITEM_LABEL_TYPE = {
    albums_count : string;
    id : string;
    name : string;
}

export type TRACK_RECENT_ITEM_ALBUM_TYPE = {
    artist : TRACK_RECENT_ITME_ARTIST_TYPE;
    duration : string;
    favCnt : string;
    hires : string;
    hires_streamable : string;
    id : string;
    image : TRACK_RECENT_ITEM_IMAGE_TYPE;
    label : TRACK_RECENT_ITEM_LABEL_TYPE;
    maximum_bit_depth : string;
    maximum_channel_count : string;
    maximum_sampling_rate : string;
    release_date_original : string;
    release_date_stream : string;
    streamable : boolean;
    title : string;
    tracks_count : string;
}

export type TRACK_RECENT_ITEM_COMPOSER_TYPE = {
    id : string;
    name : string;
}

export type TRACK_RECENT_ITEM_PERFORMER = {
    id : string;
    name : string;
}

export type TRACK_RECENT_ITEM_DATA_TYPE = {
    album : TRACK_RECENT_ITEM_ALBUM_TYPE;
    composer : TRACK_RECENT_ITEM_COMPOSER_TYPE;
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
    performer : TRACK_RECENT_ITEM_PERFORMER;
    performers : string;
    previewable : boolean;
    purchasable : boolean;
    concerthall_id? : number;
    sampleable : boolean;
    streamable : boolean;
    title : string;
    track_number : number;
}

export type TRACK_RECENT_ITEM_TYPE = {
	id: string;
    title: string;
	type: string;
	sort: number;
    arists?: string[];
    favorite: string;
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
    data? : TRACK_RECENT_ITEM_DATA_TYPE;
    albumString : string;
    artistsString : string;
    genresSTring: string;
};

export type TRACK_RECENT_LIST_RESPONSE = {
	message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    tracks: TRACK_RECENT_ITEM_TYPE[];
};

export async function getLikeTrackListAxios(
): Promise<TRACK_RECENT_LIST_RESPONSE> {
	const response: AxiosResponse<TRACK_RECENT_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/track/favorite?mediaTypes=CONCERT_HALL&sortType=TRACK_RECENT`,{
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


