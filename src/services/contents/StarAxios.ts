import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";

export type STAR_REQUEST_ITEM_TYPE = {
	id: string | null;
	clientKey: string;
}

export type STAR_REQUEST_TYPE = {
	contents: STAR_REQUEST_ITEM_TYPE[];
	mediaType: string;
}

export type STAR_RESPONSE_ITEM_TYPE = {
	id: string;
	clientKey: string;
    type: string;
	star: number;
};

export type STAR_RESPONSE_TYPE = {
	message: string;
	code: string;
    contents: STAR_RESPONSE_ITEM_TYPE[];
};

export async function getStarAxios(
	method?: string // idAlbum 파라미터를 추가했습니다.
    ,param?: STAR_REQUEST_TYPE
): Promise<STAR_RESPONSE_TYPE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<STAR_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/rating/${method}`, param,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            } // URL 구성
        } // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}

export type STAR_TRACK_REQUEST_ITEM_TYPE = {
	type: string;
	clientKey?: string;
}

export type STAR_TRACK_REQUEST_TYPE = {
	tracks: STAR_TRACK_REQUEST_ITEM_TYPE[];
}

export type STAR_TRACK_RESPONSE_ITEM_TYPE = {
	message: string;
	code: string;
    id: string | null;
};

export async function getStarTrackAxios(
    param?: STAR_TRACK_REQUEST_TYPE
): Promise<STAR_TRACK_RESPONSE_ITEM_TYPE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<STAR_TRACK_RESPONSE_ITEM_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/track/check?type=TRACK`, param,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            } // URL 구성
        } // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}

export type STAR_ALBUM_REQUEST_ITEM_TYPE = {
	type: string;
	clientKey: string;
}

export type STAR_ALBUM_REQUEST_TYPE = {
	album: STAR_ALBUM_REQUEST_ITEM_TYPE;
}

export type STAR_ALBUM_RESPONSE_ITEM_TYPE = {
	message: string;
	code: string;
    id: string;
};

export async function getStarAlbumAxios(
	param?: STAR_ALBUM_REQUEST_TYPE
): Promise<STAR_ALBUM_RESPONSE_ITEM_TYPE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<STAR_ALBUM_RESPONSE_ITEM_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/album/check`, param,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            } // URL 구성
        } // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}


