import axios, { AxiosResponse } from "axios";

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

export type TRACK_ITEM_TYPE = {
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: ALBUM_ARTIST_INFO_TYPE;
	GENRE?: string;
	media_type?: string;
	album_id: string;
	album_name: string;
	album_thumbnail? : string;
	data? : ALBUM_DATA_INFO_TYPE;
};
export type ALBUM_DETAIL_TYPE = {
	ID: string;
	TITLE: string;
	THUMBNAIL: string;
	TOTAL_NUM_TRACK: number;
	ITEM_INFO: TRACK_ITEM_TYPE[];
	ARTIST: ALBUM_ARTIST_INFO_TYPE;
};

export type TRACK_LIST_RESPONSE = {
	idAlbum: string;
	RES_CODE: string;
	LIST: ALBUM_DETAIL_TYPE[];
};

export async function getTrackAxios(
	idAlbum?: string // idAlbum 파라미터를 추가했습니다.
): Promise<TRACK_LIST_RESPONSE> {

	const response: AxiosResponse<TRACK_LIST_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/album/${idAlbum}/contents.json` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
