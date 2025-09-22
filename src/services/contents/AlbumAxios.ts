import axios, { AxiosResponse } from "axios";
import { API_URL_CIP, getCookie } from "../common";

export type ALBUM_ARTIST_INFO_TYPE = {
	artist_id: string;
	artist_name: string;
	thumbnail: string;
}

export type ALBUM_DATA_INFO_TYPE = {
	codec: string;
	duration: string;
	resolution: string;
}

export type ALBUM_ITEM_TYPE = {
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: ALBUM_ARTIST_INFO_TYPE[];
	S_ARTIST?: string;
	MEDIA_TYPE?: string;
	TOTAL_NUM_TRACK?: number;
	ALBUM_ID: string;
	ALBUM_NAME: string;
	ALBUM_THUMBNAIL?: string;
	DATA?: ALBUM_DATA_INFO_TYPE;
	PLAYABLE_CODE?: string;
	URL?: string;
	STAR?: number;
	DURATION?: string;
	YN_PURCHASED?: string;
	YN_SALE?: string;
	PRICE?:number;
	ALBUM_PRICE?:number;
	YN_CANCEL?: string;
	PAYMENT_ID?: string;
};

export type ALBUM_DETAIL_TYPE = {
	idAlbum: string;
	RES_CODE: string;
	ID: string;
	TITLE: string;
	THUMBNAIL: string;
	TOTAL_NUM_TRACK: number;
	ITEM_INFO: ALBUM_ITEM_TYPE[];
	ARTIST?: ALBUM_ARTIST_INFO_TYPE[];
	YN_SALE?: string;
	YN_PURCHASED?: string;
	STAR?:number;
	S_ARTIST?: string;
	ALBUM_PRICE? : number;
};

export type ALBUM_TRACK_CNT_TYPE = {
	album_id : string;
	track_cnt : number;
}

export type ALBUM_TRACK_CNT_RESPONSE_TYPE = {
	RES_CODE : string;
	RES_MSG : string;
	albums : ALBUM_TRACK_CNT_TYPE[];
}

export type ALBUM_TRACK_CNT_ITEM_TYPE = {
	albumId : string;
}

export type ALBUM_TRACK_CNT_REQUEST_TYPE = {
	albums : ALBUM_TRACK_CNT_ITEM_TYPE[];
}

export async function getAlbumAxios(
	idAlbum?: string // idAlbum 파라미터를 추가했습니다.
): Promise<ALBUM_DETAIL_TYPE> {

	const ID_CUST = getCookie("userid");
	const IP = getCookie("ip");
	const LANG = getCookie("lang");
	/*
	const response: AxiosResponse<ALBUM_DETAIL_TYPE> = await axios.get(
		`${API_URL_CIP}/hch/album/${idAlbum}/contents.json?ID_CUST=${ID_CUST}`, {
			headers: {
				'X-Forwarded-For': IP,
				'Accept-Language': LANG
			} // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
		}
	);
	*/
	const response: AxiosResponse<ALBUM_DETAIL_TYPE> = await axios.get(
		`${API_URL_CIP}/hch/album/${idAlbum}/contents.json?ID_CUST=${ID_CUST}` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		const albumData = response.data;
        // 파싱 로직을 여기에 추가
        if (albumData.S_ARTIST) {
            albumData.ARTIST = JSON.parse(albumData.S_ARTIST); // 앨범 수준의 S_ARTIST 파싱
		}
		
		// ITEM_INFO 배열 내의 각 아이템에 대해 S_ARTIST를 파싱
        albumData.ITEM_INFO = albumData.ITEM_INFO.map(item => ({
            ...item,
            ARTIST: item.S_ARTIST ? JSON.parse(item.S_ARTIST) : []
        }));

        return albumData;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}

export async function getAlbumTrackCnt(
	param?: ALBUM_TRACK_CNT_REQUEST_TYPE
): Promise<ALBUM_TRACK_CNT_RESPONSE_TYPE> {
	const response: AxiosResponse<ALBUM_TRACK_CNT_RESPONSE_TYPE> = await axios.post(
		`${API_URL_CIP}/hch/albums/track-counts.json`,param
	);	

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.data.RES_MSG}`);
	}
}