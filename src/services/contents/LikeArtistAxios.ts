import axios, { AxiosResponse } from "axios";
import { PLAY_RECENT_ITEM_TYPE } from "./RecentPlayListAxios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzExNTAzMDA0LCJleHAiOjIwMjY4NjMwMDQsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJyb3NldHViZVJlY2VudFBsYXlsaXN0IjoxNTUwNCwidXNlcm5hbWUiOiJKYW1pZSIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.3ZLPsp98wTCgMOChwwm2XtzRhKO7bMih556OtA6tnzvWAM_xSUSFtdMrlXCZR0k5142qpG3Cxd1L33qkRkPAaw"; // 동적으로 토큰을 얻는 로직



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
	const response: AxiosResponse<ARTIST_REG_RESPONSE_TYPE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/artist/check`,{
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


