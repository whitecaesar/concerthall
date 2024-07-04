import axios, { AxiosResponse } from "axios";
import { ARTIST_INFO_TYPE } from "./ViewAllAxios";

export type TRACK_ARTIST_INFO_TYPE = {
	artist_id: string;
	artist_name: string;
	thumbnail: string;
}

export type TRACK_DATA_INFO_TYPE = {
	codec: string;
	duration: string;
	resolution: string;
}

export type TRACK_ITEM_TYPE = {
	TRACK_ID: string;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: TRACK_ARTIST_INFO_TYPE[];
	GENRE?: string;
	MEDIA_TYPE?: string;
	ALBUM_ID: string;
	ALBUM_NAME: string;
	ALBUM_THUMBNAIL? : string;
	data? : TRACK_DATA_INFO_TYPE;
	DURATION? : string;
	S_ARTIST?: string;
	STAR?: number;
	PRICE?:number;
	ALBUM_PRICE?:number;
};

export type TRACK_INFO_RESPONSE = {
	idTrack: string;
	RES_CODE: string;
    RES_MSG?: string;
	TRACK_INFO: TRACK_ITEM_TYPE;
};

export async function getTrackAxios(
	idTrack?: string // idAlbum 파라미터를 추가했습니다.
): Promise<TRACK_INFO_RESPONSE> {

	const response: AxiosResponse<TRACK_INFO_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/track/${idTrack}/info.json` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		const trackData = response.data;
		if (trackData.TRACK_INFO.S_ARTIST) {
            trackData.TRACK_INFO.ARTIST = JSON.parse(trackData.TRACK_INFO.S_ARTIST); // 앨범 수준의 S_ARTIST 파싱
        }
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
