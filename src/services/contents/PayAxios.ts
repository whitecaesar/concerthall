import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";


export function generateClientRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);

    return Array.from(array, (num) => characters[num % characters.length]).join('');
}

export type PASS_CHECK_RESPONSE = {
	message: string;
	code: string;
};

export type PASS_CHECK_REQUEST = {
    password: string;
}

export async function getPassCheckAxios(
	param?:PASS_CHECK_REQUEST
): Promise<PASS_CHECK_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
    console.log(token);
	const response: AxiosResponse<PASS_CHECK_RESPONSE> = await axios.post(
		`https://dev.api.roseaudio.kr/v1/member/member/password/check`,param, {
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
        return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}


export type BALANCE_CHECK_DATA_TYPE = {
    point : number;
    cash : number;
}

export type BALANCE_CHECK_RESPONSE = {
	message: string;
	code: string;
	data: BALANCE_CHECK_DATA_TYPE;
};

export async function getBalanceCheckAxios(
): Promise<BALANCE_CHECK_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	//console.log("token : ", token);
	const response: AxiosResponse<BALANCE_CHECK_RESPONSE> = await axios.get(
		`https://dev.api.roseaudio.kr/payment/v1/balance`,{
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
        return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}

export type PAYMENT_RESPONSE = {
	message: string;
	code: string;
};

export type PAYMENT_REQUEST_TYPE = {
    price : number;
    cpCode : string;
    appType : string;
    paymentId : string;
}

export async function setPaymentAxios(
	param?: PAYMENT_REQUEST_TYPE
): Promise<PASS_CHECK_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}

    // 멱등성 키 생성
    const id_key = generateClientRandomString();

	const response: AxiosResponse<PASS_CHECK_RESPONSE> = await axios.post(
		`https://dev.api.roseaudio.kr/payment/v1/payments`,param, {
		headers: {
			'Authorization': `Bearer ${token}`,
            'Idempotency-key': `${id_key}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
		if(response.data.code === '200')
        {
            return response.data;
        }
        else{
            throw new Error(`에러입니다. ${response.data.message}`);
        }
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}

export type TRACK_PURCHASE_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
};

export type TRACK_PURCHASE_REQUEST_TYPE = {
    ID_CUST : string;
    PRICE : number;
}

export async function setTrackPurchaseAxios(
	idTrack?: string,
	param?: TRACK_PURCHASE_REQUEST_TYPE
): Promise<TRACK_PURCHASE_RESPONSE> {
	let token = getCookie("token");
	if(!token)
	{
		token = process.env.NEXT_PUBLIC_TOKEN;
	}
	const response: AxiosResponse<TRACK_PURCHASE_RESPONSE> = await axios.post(
		`http://cip.ontown.co.kr/hch/track/${idTrack}/purchase.json`,
		null, 
		{
			params: param,
		}
	);

	
	if (response.status === 200) {
            return response.data;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}