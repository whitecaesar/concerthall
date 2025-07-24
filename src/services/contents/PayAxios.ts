import axios, { AxiosResponse } from "axios";
import { getCookie, API_URL, API_URL_CIP } from "../common";


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

	const response: AxiosResponse<PASS_CHECK_RESPONSE> = await axios.post(
		`${API_URL}/v1/member/member/password/check`,param, {
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	
	if (response.status === 200) {
        return response.data;
	} else {
		throw new Error(`System Error. ${response.data.message}`);
	}
}


export type BALANCE_CHECK_DATA_TYPE = {
    rewardPoint : number;
    chargePoint : number;
}

export type BALANCE_CHECK_RESPONSE = {
	message: string;
	code: string;
	data: BALANCE_CHECK_DATA_TYPE;
};

export async function getBalanceCheckAxios(
): Promise<BALANCE_CHECK_RESPONSE> {
	let token = getCookie("token");

	const response: AxiosResponse<BALANCE_CHECK_RESPONSE> = await axios.get(
		`${API_URL}/payment/v1/balance`,{
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	console.log("response",response);
	if (response.status === 200) {
        return response.data;
	} else {
		throw new Error(`System Error. ${response.data.message}`);
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
    purchaseId : string;
}

export type PAYMENT_CONFIRM_REQUEST_TYPE = {
	reason : string;
	cpCode : string;
	appType : string;
	purchaseId : string;
}

export async function setPaymentAxios(
	param?: PAYMENT_REQUEST_TYPE,
	id_key?: string,
): Promise<PASS_CHECK_RESPONSE> {
	let token = getCookie("token");

	const response: AxiosResponse<PASS_CHECK_RESPONSE> = await axios.post(
		`${API_URL}/payment/v1/content/purchase`,param, {
		headers: {
			'Authorization': `Bearer ${token}`,
      'Idempotency-key': `${id_key}`
		} // URL 구성을 동적으로 변경했습니다.
	});

	console.log("response",response);
	return response.data;
	/*
	if (response.status === 200) {
		if(response.data.code === '200.1')
        {
            return response.data;
        }
        else{
            throw new Error(`System Error. ${response.data.message}`);
        }
	} else {
		throw new Error(`System Error. ${response.data.message}`);
	}
	*/
}

export async function setPaymentConfirmAxios(
	param?: PAYMENT_CONFIRM_REQUEST_TYPE,
	id_key?: string,
): Promise<PASS_CHECK_RESPONSE> {
	console.log("paymentConfirm");
	let token = getCookie("token");

	const response: AxiosResponse<PASS_CHECK_RESPONSE> = await axios.post(
		`${API_URL}/payment/v1/content/purchase/confirm`,param, {
		headers: {
			'Authorization': `Bearer ${token}`
		} // URL 구성을 동적으로 변경했습니다.
	});
	console.log("paymentConfirm response",response);
	if (response.status === 200) {
		if(response.data.code === '200.1' || response.data.code === '409.2')
        {
            return response.data;
        }
        else{
            throw new Error(`System Error. ${response.data.message}`);
        }
	} else {
		throw new Error(`System Error. ${response.data.message}`);
	}
}

export type TRACK_PURCHASE_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	CPCODE : string;
};

export type TRACK_PURCHASE_REQUEST_TYPE = {
    ID_CUST : string;
    PRICE : number;
		PURCHASE_ID : string;
}

export async function setTrackPurchaseAxios(
	idTrack?: string,
	param?: TRACK_PURCHASE_REQUEST_TYPE
): Promise<TRACK_PURCHASE_RESPONSE> {
	let token = getCookie("token");

	const response: AxiosResponse<TRACK_PURCHASE_RESPONSE> = await axios.post(
		`${API_URL_CIP}/hch/track/${idTrack}/purchase.json`,
		null, 
		{
			params: param,
		}
	);

	
	if (response.status === 200) {
      return response.data;
	} else {
		throw new Error(`System Error. ${response.data.RES_MSG}`);
	}
}

export async function setAlbumPurchaseAxios(
	idAlbum?: string,
	param?: TRACK_PURCHASE_REQUEST_TYPE
): Promise<TRACK_PURCHASE_RESPONSE> {
	let token = getCookie("token");

	const response: AxiosResponse<TRACK_PURCHASE_RESPONSE> = await axios.post(
		`${API_URL_CIP}/hch/album/${idAlbum}/purchase.json`,
		null, 
		{
			params: param,
		}
	);
	
	if (response.status === 200) {
    return response.data;
	} else {
		throw new Error(`System Error. ${response.data.RES_MSG}`);
	}
}

export async function setTrackPurchaseCancelAxios(
	idTrack?: string,
	param?: TRACK_PURCHASE_REQUEST_TYPE
): Promise<TRACK_PURCHASE_RESPONSE> {

	const response: AxiosResponse<TRACK_PURCHASE_RESPONSE> = await axios.post(
		`${API_URL_CIP}/hch/track/${idTrack}/cancelPurchase.json`,
		null, 
		{
			params: param,
		}
	);

	
	if (response.status === 200) {
    return response.data;
	} else {
		throw new Error(`System Error. ${response.data.RES_MSG}`);
	}
}

export async function setAlbumPurchaseCancelAxios(
	idAlbum?: string,
	param?: TRACK_PURCHASE_REQUEST_TYPE
): Promise<TRACK_PURCHASE_RESPONSE> {

	const response: AxiosResponse<TRACK_PURCHASE_RESPONSE> = await axios.post(
		`${API_URL_CIP}/hch/album/${idAlbum}/cancelPurchase.json`,
		null, 
		{
			params: param,
		}
	);

	console.log("cancelPurchase response",response);
	
	if (response.status === 200) {
      return response.data;
	} else {
		throw new Error(`System Error. ${response.data.RES_MSG}`);
	}
}