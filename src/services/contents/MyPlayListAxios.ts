import axios, { AxiosResponse } from "axios";
import { PLAY_RECENT_ITEM_TYPE } from "./RecentPlayListAxios";
import { getCookie } from "../common";

export type MY_RECENT_LIST_RESPONSE = {
	message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    playlists: PLAY_RECENT_ITEM_TYPE[];
};

export async function getMyPlayListAxios(
	mediaTypes?: string,
	size?:number // idAlbum 파라미터를 추가했습니다.
): Promise<MY_RECENT_LIST_RESPONSE> {
	//const token = getCookie("token");
	const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDQyOTgiLCJpYXQiOjE3MjA1MDI3NjAsImV4cCI6MjAzNTg2Mjc2MCwiaWQiOjEwNDI5OCwibmFtZSI6ImFueXRvb24iLCJubyI6MTA0Mjk4LCJmcmllbmQiOjM2MjUsInVzZXJuYW1lIjoiYW55dG9vbiIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.H9nWJIgsKU98_iOR9b6gSe0qKUqkUp_I4M7C1OLM6mKvK1vK089kI6JU91TGAP-xb3DSg-M6lvubY2fAf905KQ";	
	const response: AxiosResponse<MY_RECENT_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/playlist?sortType=PLAYLIST_RECENT&mediaTypes=CONCERT_HALL&page=0&size=${size}`,{
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

