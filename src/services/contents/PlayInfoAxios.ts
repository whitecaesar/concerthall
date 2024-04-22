import axios, { AxiosResponse } from "axios";

export type PLAY_URL_TYPE = {
	URL: string;
};

export type PLAY_ITEM_RESPONSE = {
	idTrack: string;
	idAlbum: string;
	RES_CODE: string;
    INFO:PLAY_URL_TYPE;
};

export async function getPlayInfoAxios(
	idAlbum?: string // idAlbum 파라미터를 추가했습니다.
    ,idTrack?: string
): Promise<PLAY_ITEM_RESPONSE> {

	const response: AxiosResponse<PLAY_ITEM_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/track/${idTrack}/${idAlbum}/playInfo.json` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
