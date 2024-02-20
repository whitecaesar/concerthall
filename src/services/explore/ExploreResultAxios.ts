import axios, { AxiosResponse } from "axios";
import { ITEM_INFO_TYPE } from "../contents/ViewAllAxios";

export type TRESULT_LIST_RES = {
	ID: string;
	TYPE: string;
	TITLE: string;
	TOTAL_NUM_ITEM: number;
	ITEM_INFO: ITEM_INFO_TYPE[];
};

export type TTRESULT_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	RESULT_LIST: TRESULT_LIST_RES[];
};

export function getExploreResultAxios(): Promise<TTRESULT_LIST_RESPONSE | void> {
	return axios
		.get("http://cip.ontown.co.kr/hch/result/recom.json")
		.then((response: AxiosResponse<TTRESULT_LIST_RESPONSE>) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error(`에러입니다.`);
			}
		});
}
