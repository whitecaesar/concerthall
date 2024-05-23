import axios, { AxiosResponse } from "axios";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDI5IiwiaWF0IjoxNzExNTAzMDA0LCJleHAiOjIwMjY4NjMwMDQsImlkIjozMDI5LCJuYW1lIjoiSmFtaWUiLCJubyI6MzAyOSwiZnJpZW5kIjoyMzY1LCJyb3NldHViZVJlY2VudFBsYXlsaXN0IjoxNTUwNCwidXNlcm5hbWUiOiJKYW1pZSIsImlzRW1haWxDb25maXJtIjpmYWxzZSwiYXV0aG9yaXRpZXMiOlsiUk9TRV9NRU1CRVIiLCJST0xFX1VTRVJfT05MSU5FIl19.3ZLPsp98wTCgMOChwwm2XtzRhKO7bMih556OtA6tnzvWAM_xSUSFtdMrlXCZR0k5142qpG3Cxd1L33qkRkPAaw"; // 동적으로 토큰을 얻는 로직

export type PLT_LIKE_REQUEST_TYPE = {
	targetId:string;
    type:string;
    thumbup:boolean;
}

export type PLT_LIKE_RESPONSE_TYPE = {
	message: string;
	code: string;
};

export async function setPLLIKEAxios(
    param?: PLT_LIKE_REQUEST_TYPE
): Promise<PLT_LIKE_RESPONSE_TYPE> {
	const response: AxiosResponse<PLT_LIKE_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/playlist/thumbup`, param,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            } // URL 구성
        } // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}

export type PLT_LIKE_RST_RESPONSE_TYPE = {
	message: string;
	code: string;
    result: boolean;
};

export async function getPLLIKEAxios(
    targetId: string
): Promise<PLT_LIKE_RST_RESPONSE_TYPE> {
	const response: AxiosResponse<PLT_LIKE_RST_RESPONSE_TYPE> = await axios.get(
		`https://dev.api.roseaudio.kr/v1/member/playlist/thumbup?targetId=${targetId}&type=PLAY_LIST`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            } // URL 구성
        } // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}




