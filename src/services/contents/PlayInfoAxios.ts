import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";

export type PLAY_URL_TYPE = {
	URL: string;
};

export type PLAY_ITEM_RESPONSE = {
	idTrack: string;
	RES_CODE: string;
    INFO:PLAY_URL_TYPE;
};

export async function getPlayInfoAxios(
    idTrack?: string
): Promise<PLAY_ITEM_RESPONSE> {
	const ID_CUST = getCookie("userid");
	const response: AxiosResponse<PLAY_ITEM_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/track/${idTrack}/playInfo.json?ID_CUST=${ID_CUST}` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
