import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";

export type PLAY_URL_TYPE = {
	URL: string;
	PLAYABLE_CODE : string;
	PURCHASE_ID?: string;
};

export type PLAY_ITEM_RESPONSE = {
	idTrack: string;
	RES_CODE: string;
  INFO:PLAY_URL_TYPE;
	DURATION?: string;
};

export async function getPlayInfoAxios(
    idTrack?: string
): Promise<PLAY_ITEM_RESPONSE> {
	const ID_CUST = getCookie("userid");
	const IP = getCookie("ip");
	const LANG = getCookie("lang");
	const response: AxiosResponse<PLAY_ITEM_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/track/${idTrack}/playInfo.json?ID_CUST=${ID_CUST}` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`System Error. ${response.status}`);
	}
}


export async function funcGetPreviewAxios(
		idTrack?: string
	): Promise<PLAY_ITEM_RESPONSE> {
		const ID_CUST = getCookie("userid");
		const IP = getCookie("ip");
		const LANG = getCookie("lang");
		const response: AxiosResponse<PLAY_ITEM_RESPONSE> = await axios.get(
			`http://cip.ontown.co.kr/hch/track/${idTrack}/previewInfo.json?ID_CUST=${ID_CUST}` // URL 구성을 동적으로 변경했습니다.
		);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(`System Error. ${response.status}`);
		}
}
