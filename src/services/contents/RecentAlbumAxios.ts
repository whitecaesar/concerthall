import axios, { AxiosResponse } from "axios";
import {TRACK_TRACKS_ITEM_TYPE } from "./PlayListTrackAxios";
import { API_URL, getCookie } from "../common";

export type ALBUM_RECENT_ITEM_TYPE = {
	id: string;
	title: string;
	clientKey: string;
	tracks?: TRACK_TRACKS_ITEM_TYPE[];
	favorite: boolean;
    star: number;
    thumbnail:string;
    type: string;
    playTime?: string;
};

export type ALBUM_RECENT_LIST_TYPE = {
	type: string;
	album: ALBUM_RECENT_ITEM_TYPE;
};

export type ALBUM_RECENT_LIST_RESPONSE = {
	message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    recentList: ALBUM_RECENT_LIST_TYPE[];

};

export async function getRecentAlbumAxios(
	mediaTypes?: string, // idAlbum 파라미터를 추가했습니다.
	page?:number,
	size?:number
): Promise<ALBUM_RECENT_LIST_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<ALBUM_RECENT_LIST_RESPONSE> = await axios.get(
		`${API_URL}/v1/member/album/recent?mediaTypes=CONCERT_HALL&page=${page}&size=${size}`,{
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.data.message}`);
	}
}
