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
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
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


