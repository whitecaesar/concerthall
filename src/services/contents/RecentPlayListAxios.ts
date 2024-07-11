import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";

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
	lastUpdateDateTime?: string;
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
	//const token = getCookie("token");
	const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzIwMDU3MzUyLCJleHAiOjIwMzU0MTczNTIsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJ1c2VybmFtZSI6IkphbWllIiwiaXNFbWFpbENvbmZpcm0iOnRydWUsImF1dGhvcml0aWVzIjpbIlJPU0VfTUVNQkVSIiwiUk9MRV9VU0VSX09OTElORSJdfQ.ot5L_vba_Bq3fXRyetjnxkU2EPmuZlvaELWlefI1CDikPbGIEAEFWHpknBm8vWwr8bWQHwxIH5t12g2Zg6Vpdw";
	const response: AxiosResponse<PLAY_RECENT_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/playlist/recent?mediaTypes=CONCERT_HALL&page=0&size=${size}`,{
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

