import axios, { AxiosResponse } from "axios";
import { ARTIST_INFO_TYPE, VIEWALL_LIST_TYPE} from "../contents/ViewAllAxios";

export type TRESULT_LIST_RESPONSE = {
	RES_CODE: string;
	RECOMMEND_LIST: VIEWALL_LIST_TYPE[];
	ARTIST_LIST : ARTIST_INFO_TYPE[];
};

export async function getExploreResults(
	keyword? : string
): Promise<TRESULT_LIST_RESPONSE> {
	const response: AxiosResponse = await axios.get(
		`http://cip.ontown.co.kr/hch/search/info.json?key=${keyword}`
	);

	if (response.status === 200) {
		const data = response.data as TRESULT_LIST_RESPONSE;
		
		const parsedRecommendList = data.RECOMMEND_LIST.map(list => ({
			...list,
			ITEM_INFO: list.ITEM_INFO.map(item => ({
			...item,
			ARTIST: JSON.parse(item.S_ARTIST) as ARTIST_INFO_TYPE[]
			}))
		}));
		
		return {
			...data,
			RECOMMEND_LIST: parsedRecommendList
		};
	} else {
		throw new Error(
			`데이터를 불러오는 중 오류가 발생했습니다. (응답 코드: ${response.status})`
		);
	}
}
