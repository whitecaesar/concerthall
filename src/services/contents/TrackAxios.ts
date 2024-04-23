import axios, { AxiosResponse } from "axios";

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
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: TRACK_ARTIST_INFO_TYPE;
	GENRE?: string;
	media_type?: string;
	album_id: string;
	album_name: string;
	album_thumbnail? : string;
	data? : TRACK_DATA_INFO_TYPE;
};

export type TRACK_INFO_RESPONSE = {
	idTrack: string;
	RES_CODE: string;
    RES_MSG: string;
	TRACK_INFO: TRACK_ITEM_TYPE;
};

export async function getTrackAxios(
	idTrack?: string // idAlbum 파라미터를 추가했습니다.
): Promise<TRACK_INFO_RESPONSE> {

	const response: AxiosResponse<TRACK_INFO_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/track/${idTrack}/info.json` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
