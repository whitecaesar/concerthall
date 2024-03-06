import axios, { AxiosResponse } from "axios";
import { ITEM_INFO_TYPE, VIEWALL_LIST_TYPE } from "../contents/ViewAllAxios";

// export type TRESULT_LIST_RES = {
// 	TYPE: string;
// 	ID: number;
// 	TITLE: string;
// 	TOTAL_NUM_ITEM: number;
// 	ITEM_INFO: ITEM_INFO_TYPE[];
// };

export type TRESULT_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	RESULT_LIST: VIEWALL_LIST_TYPE[];
};

export async function getExploreResults(): Promise<TRESULT_LIST_RESPONSE> {
	const response: AxiosResponse = await axios.get(
		"http://cip.ontown.co.kr/hch/result/recom.json"
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(
			`데이터를 불러오는 중 오류가 발생했습니다. (응답 코드: ${response.status})`
		);
	}
}
