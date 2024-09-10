import axios, { AxiosResponse } from "axios";
import { PLAY_RECENT_ITEM_TYPE } from "./RecentPlayListAxios";
import { getCookie } from "../common";


export type ARTIST_REG_REQUEST_ITEM = {
    type : string;
    clientKey : string;
};
export type ARTIST_REG_REQUEST_TYPE = {
	artist: ARTIST_REG_REQUEST_ITEM;
};

export type ARTIST_REG_RESPONSE_TYPE = {
    message : string;
    code : string;
    id : string;
    thumbnail : string;
}

export async function getRegArtistInfoAxios(
	param?:ARTIST_REG_REQUEST_TYPE // idAlbum 파라미터를 추가했습니다.
): Promise<ARTIST_REG_RESPONSE_TYPE> {
    //const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<ARTIST_REG_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/artist/check`,param, {
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


export type ARTIST_STAR_ID_TYPE = {
    id : string;
}

export type ARTIST_STAR_RATING_TYPE = {
    star : number;
}

export type ARTIST_STAR_REQUEST_TYPE = {
    artist : ARTIST_STAR_ID_TYPE;
    ratingInfo : ARTIST_STAR_RATING_TYPE;
}

export type ARTIST_STAR_RESPOSNE_TYPE = {
    message : string;
    code : string;
}

export async function setArtistStarAxios(
    param?: ARTIST_STAR_REQUEST_TYPE
): Promise<ARTIST_STAR_RESPOSNE_TYPE> {
    //const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<ARTIST_STAR_RESPOSNE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/rating/star?type=ARTIST`, param,
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

export type ARTIST_SETREG_ARTIST_TYPE = {
    name : string;
    type : string;
    clientkey : string;
    comment : string;
    thumbnail : string;
}

export type ARTIST_SETREG_REQUEST_TYPE = {
    artist : ARTIST_SETREG_ARTIST_TYPE;
}

export type ARTIST_SETREG_RESPOSNE_TYPE = {
    message : string;
    code : string;
    id : any;
}
export async function setRegArtistAxios(
    param?: ARTIST_SETREG_REQUEST_TYPE
): Promise<ARTIST_SETREG_RESPOSNE_TYPE> {
    //const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<ARTIST_SETREG_RESPOSNE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/artist`, param,
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

export type ARTIST_GET_STAR_REQUEST_TYPE = {
	artist: ARTIST_STAR_ID_TYPE;
};

export type ARTIST_GET_STAR_RATION_TYPE = {
    type : string;
    star : number;
    favorite : boolean;
    thumbup : boolean;
}

export type ARTIST_GET_STAR_RESPONSE_TYPE = {
    message : string;
    code : string;
    rating : ARTIST_GET_STAR_RATION_TYPE;
}

export async function getArtistStarAxios(
	param?:ARTIST_GET_STAR_REQUEST_TYPE // idAlbum 파라미터를 추가했습니다.
): Promise<ARTIST_GET_STAR_RESPONSE_TYPE> {
    //const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<ARTIST_GET_STAR_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/rating?type=ARTIST&mediaType=CONCERT_HALL`,param,
        {
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


export type ARTIST_LIST_ARTISTDTOS_TYPE = {
    id : string;
    name : string;
    type : string;
    clientKey : string;
    comment : string;
    thumbnail : string[];
    favorite : boolean;
    star : number;
}

export type ARTIST_LIST_RESPONSE_TYPE = {
    message: string;
	code: string;
	size: number;
    page: number;
    totalCount: number;
    last: boolean;
    offset:number;
    artistDtos: ARTIST_LIST_ARTISTDTOS_TYPE[];
}

export async function getArtistListAxios(
	size?:number, // idAlbum 파라미터를 추가했습니다.
    page?:number
): Promise<ARTIST_LIST_RESPONSE_TYPE> {
    //const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<ARTIST_LIST_RESPONSE_TYPE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/artist/favorite?mediaTypes=CONCERT_HALL&sortType=ARTIST_NAME_ASC&page=${page}&size=${size}`,
        {
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
