import axios, { AxiosResponse } from "axios";
import { TRACK_TRACKS_ITEM_TYPE } from "./PlayListTrackAxios";
import { ALBUM_RECENT_ITEM_TYPE } from "./RecentAlbumAxios";
import { getCookie } from "../common";

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
	//const token = getCookie("token");
	const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzIwMDU3MzUyLCJleHAiOjIwMzU0MTczNTIsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJ1c2VybmFtZSI6IkphbWllIiwiaXNFbWFpbENvbmZpcm0iOnRydWUsImF1dGhvcml0aWVzIjpbIlJPU0VfTUVNQkVSIiwiUk9MRV9VU0VSX09OTElORSJdfQ.ot5L_vba_Bq3fXRyetjnxkU2EPmuZlvaELWlefI1CDikPbGIEAEFWHpknBm8vWwr8bWQHwxIH5t12g2Zg6Vpdw";
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


