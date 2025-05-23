import axios, { AxiosResponse } from "axios";
import { PLAY_RECENT_ITEM_TYPE } from "./RecentPlayListAxios";
import { getCookie, API_URL } from "../common";

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

export async function getLikePlayListAxios(
	mediaTypes?: string,
	size?:number // idAlbum 파라미터를 추가했습니다.
): Promise<MY_RECENT_LIST_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<MY_RECENT_LIST_RESPONSE> = await axios.get(
		`${API_URL}/v1/member/playlist?sortType=PLAYLIST_RECENT&isFavorite=true&mediaTypes=CONCERT_HALL&page=0&size=${size}`,{
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`System Error. ${response.data.message}`);
	}
}

