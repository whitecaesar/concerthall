import axios, { AxiosResponse } from "axios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzExNTAzMDA0LCJleHAiOjIwMjY4NjMwMDQsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJyb3NldHViZVJlY2VudFBsYXlsaXN0IjoxNTUwNCwidXNlcm5hbWUiOiJKYW1pZSIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.3ZLPsp98wTCgMOChwwm2XtzRhKO7bMih556OtA6tnzvWAM_xSUSFtdMrlXCZR0k5142qpG3Cxd1L33qkRkPAaw"; // 동적으로 토큰을 얻는 로직

export type PLAY_RECENT_ITEM_TYPE = {
	id: number;
	type: string;
	title: string;
	star: number;
	share: string;
    ownerId: number;
    ownerName:string;
    favoriteTrack: string;
	favorite: string;
	thumbup: string;
	thumbupCount: string;
	trackCount: string;
	thumbnail: string;
	tags: [];
	sort: number;
	registDateTime: string;
	comment: string;
	clientKey: string;
	playTime: string;
	isRose: boolean;
	lastUpdateDateTime: string;
};


export type PLAY_RECENT_LIST_TYPE = {
	type: string;
	playlist: PLAY_RECENT_ITEM_TYPE;
};

export type PLAY_RECENT_LIST_RESPONSE = {
	message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    recentList: PLAY_RECENT_LIST_TYPE[];
};

export async function getRecentPlayListAxios(
	mediaTypes?: string,
	size?:number // idAlbum 파라미터를 추가했습니다.
): Promise<PLAY_RECENT_LIST_RESPONSE> {
	const response: AxiosResponse<PLAY_RECENT_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/playlist/recent?mediaTypes=QOBUZ&page=0&size=${size}`,{
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
