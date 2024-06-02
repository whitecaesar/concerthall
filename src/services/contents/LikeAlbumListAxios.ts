import axios, { AxiosResponse } from "axios";
import { TRACK_TRACKS_ITEM_TYPE } from "./PlayListTrackAxios";
import { ALBUM_RECENT_ITEM_TYPE } from "./RecentAlbumAxios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzExNTAzMDA0LCJleHAiOjIwMjY4NjMwMDQsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJyb3NldHViZVJlY2VudFBsYXlsaXN0IjoxNTUwNCwidXNlcm5hbWUiOiJKYW1pZSIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.3ZLPsp98wTCgMOChwwm2XtzRhKO7bMih556OtA6tnzvWAM_xSUSFtdMrlXCZR0k5142qpG3Cxd1L33qkRkPAaw"; // 동적으로 토큰을 얻는 로직

export type ALBUM_LIKE_LIST_RESPONSE = {
	message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    albums: ALBUM_RECENT_ITEM_TYPE[];

};

export async function getLikeAlbumListAxios(
): Promise<ALBUM_LIKE_LIST_RESPONSE> {
	const response: AxiosResponse<ALBUM_LIKE_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/album/favorite?mediaType=CONCERT_HALL&sortType=TITLE_ASC`,{
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


