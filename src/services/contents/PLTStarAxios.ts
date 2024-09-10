import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";

export type PLT_STAR_REQUEST_TRACK_TYPE = {
	id: string;
};

export type PLT_STAR_REQUEST_RATINGINFO_TYPE = {
	type: string;
	star: number;
};

export type PLT_STAR_REQUEST_TYPE = {
	ratingInfo:PLT_STAR_REQUEST_RATINGINFO_TYPE;
    track:PLT_STAR_REQUEST_TRACK_TYPE
}

export type PLT_STAR_RESPONSE_TYPE = {
	message: string;
	code: string;
};

export async function setPLTStarAxios(
    param?: PLT_STAR_REQUEST_TYPE
): Promise<PLT_STAR_RESPONSE_TYPE> {
	//const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<PLT_STAR_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/rating/star?type=TRACK`, param,
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

export type ALBUM_STAR_REQUEST_TYPE = {
	ratingInfo:PLT_STAR_REQUEST_RATINGINFO_TYPE;
    album:PLT_STAR_REQUEST_TRACK_TYPE
}

export type ALBUM_STAR_RESPONSE_TYPE = {
	message: string;
	code: string;
};

export async function setAlbumStarAxios(
    param?: ALBUM_STAR_REQUEST_TYPE
): Promise<ALBUM_STAR_RESPONSE_TYPE> {
	//const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<ALBUM_STAR_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/rating/star?type=ALBUM`, param,
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

export type REG_TRACK_REQEUST_ITEM_TYPE = {
	clientKey: string;
	data?:{};
	duration: number;
	star: number;
	thumbnailUrl: string;
	title: string;
	type : string;
};

export type REG_TRACK_REQEUST_TYPE = {
	tracks: REG_TRACK_REQEUST_ITEM_TYPE[];
};

export async function setRegTrackAxios(
    param?: REG_TRACK_REQEUST_TYPE
): Promise<PLT_STAR_RESPONSE_TYPE> {
	//const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<PLT_STAR_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/track`, param,
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

export type REG_ALBUM_REQEUST_ITEM_TYPE = {
	clientKey: string;
	star: number;
	thumbnail: string;
	artist?: string;
	title: string;
	type : string;
	favorite? : boolean;
};

export type REG_ALBUM_REQEUST_TYPE = {
	album: REG_ALBUM_REQEUST_ITEM_TYPE;
};

export async function setRegAlbumAxios(
    param?: REG_ALBUM_REQEUST_TYPE
): Promise<PLT_STAR_RESPONSE_TYPE> {
	//const token = getCookie("token");
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const response: AxiosResponse<PLT_STAR_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/album`, param,
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


