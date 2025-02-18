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
	page?:number,
	size?:number // idAlbum 파라미터를 추가했습니다.
): Promise<PLAY_RECENT_LIST_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<PLAY_RECENT_LIST_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/playlist/recent?mediaTypes=CONCERT_HALL&page=${page}&size=${size}`,{
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

