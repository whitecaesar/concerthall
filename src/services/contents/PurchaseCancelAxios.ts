import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";

export type CANCEL_RESPONSE_TYPE = {
	message: string;
	code: string;
}

export type CANCEL_REQUEST_TYPE = {
	cpCode: string;
	appType: string;
	purchaseId: string;
  reason: string;
}

export async function setCitechCancelAxios(
	param?: CANCEL_REQUEST_TYPE
): Promise<CANCEL_RESPONSE_TYPE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<CANCEL_RESPONSE_TYPE> = await axios.post(
		`https://dev.api.roseaudio.kr/payment/v1/content/purchase/cancel`, param,
				{
						headers: {
								'Authorization': `Bearer ${token}`
						} // URL 구성
				} // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`System Error ${response.status}`);
	}
}


export type INNER_CANCEL_RESPONSE_TYPE = {
	REG_MSG: string;
	REG_CODE: string;
}

export type INNER_CANCEL_REQUEST_TYPE = {
	ID_CUST: string;
}

export async function setCancelAxios(
	paymentId: string,
  param?: INNER_CANCEL_REQUEST_TYPE
): Promise<INNER_CANCEL_RESPONSE_TYPE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<INNER_CANCEL_RESPONSE_TYPE> = await axios.post(
		`http://cip.ontown.co.kr/cancel/${paymentId}/cancelPurchase.json`, param,
				{
						headers: {
								'Authorization': `Bearer ${token}`
						} // URL 구성
				} // URL 구성을 동적으로 변경했습니다. // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`System Error ${response.status}`);
	}
}
