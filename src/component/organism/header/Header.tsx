"use client";
import { useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import MainNav from "@/component/molecule/navigation/MainNav";
import SubNav from "@/component/molecule/navigation/SubNav";
import { setCookie, getCookie, deleteCookie } from "@/services/common";

declare global {
    interface Window {
        userInfo:any;
				logout:any;
    }
}

export default function Header() {
	useEffect(() => {
		console.log("이벤트 리스너 설정 중...");
		
		// userInfo 함수 정의
		window.userInfo = (token :any, app_type : any, lang : any, userid : any) => {
			console.log("userInfo 함수 호출됨", { token, app_type, lang, userid });
			setCookie("token", token, 7);
			setCookie("app_type", app_type, 7);
			setCookie("lang", lang, 7); 
			setCookie("userid", userid, 7);
		};

		// logout 함수 정의
		window.logout = () => {
			console.log("logout 함수 호출됨");
			deleteCookie("token");
			deleteCookie("app_type");
			deleteCookie("lang");
			deleteCookie("userid");
			deleteCookie("ip");
		};

		// 메시지 이벤트 핸들러
		const messageHandler = (event: { origin: any; data: string; }) => {
			console.log("메시지 이벤트 발생:", event.origin);
			console.log("메시지 데이터:", event.data);
			
			try {
					// 문자열로 전달된 경우 JSON 파싱 시도
					const data = typeof event.data === 'string' 
						? JSON.parse(event.data) 
						: event.data;
						
					if (data.type || (data.data && data.data.type) && data.type !== "") {
						const values = data.data || data;
							if(values.type === "userInfo") {
								setCookie("type", values.type || '', 7);
								setCookie("token", values.tokenValue || '', 7);
								setCookie("app_type", values.appTypeValue || '', 7);
								setCookie("lang", values.languageValue || '', 7); 
								setCookie("userid", values.userIdValue || '', 7);
								console.log("타입쿠키 :", values.type);
								console.log("토큰쿠키 :", values.tokenValue);
								console.log("앱타입쿠키 :", values.appTypeValue);
								console.log("언어쿠키 :", values.languageValue);
								console.log("유저아이디쿠키 :", values.userIdValue);
								console.log("쿠키 설정 완료");
							}
					}

			} catch (error) {
				console.error("메시지 처리 중 오류 발생:", error);
			}
		};

		// 두 가지 방식 모두 사용하여 최대한 호환성 확보
		window.addEventListener("message", messageHandler);
		/*
		document.addEventListener("message", (event: Event) => {
			// Event 객체를 MessageEvent로 타입 변환하여 처리
			const messageEvent = event as MessageEvent;
			messageHandler({
				origin: messageEvent.origin,
				data: messageEvent.data
			});
		});
		*/
		console.log("메시지 이벤트 리스너 등록 완료");

		const messageData = {
			type: "ready",
		};
		// 일반 웹뷰에서 호출
		(window as any).parent.postMessage(messageData, "*");
		/*
		if ((window as any).parent.ReactNativeWebView) {
			(window as any).parent.ReactNativeWebView.postMessage(JSON.stringify(messageData));
		}
		*/

		// IP 주소 가져오기
		fetch('https://api.ipify.org?format=json')
			.then(response => response.json())
			.then(data => {
				setCookie("ip", data.ip, 7);
				console.log("IP 주소 쿠키 설정 완료:", data.ip);
			})
			.catch(error => {
				console.error('IP 주소 가져오기 실패:', error);
			});

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
		//	window.removeEventListener("message", messageHandler);
		//	console.log("메시지 이벤트 리스너 제거됨");
	};
}, []);


const path = usePathname();
const ynMainNav = useMemo(
	() => path === "/my" || path === "/explore" || path === "/main",
	[path]
);

useEffect(() => {
	// path 변수가 변경될 때 특정 작업을 수행
}, [path]);

return <>{ynMainNav ? <MainNav /> : <SubNav title="타이틀" />}</>;

}
