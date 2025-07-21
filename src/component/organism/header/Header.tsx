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
		window.userInfo = (token :any, app_type : any, lang : any, userid : any) => {
			setCookie("token", token, 7);
			setCookie("app_type", app_type, 7);
			setCookie("lang", lang, 7); 
			setCookie("userid", userid, 7);
		};

		window.logout = () => {
			deleteCookie("token");
			deleteCookie("app_type");
			deleteCookie("lang");
			deleteCookie("userid");
			deleteCookie("ip");
		};

		fetch('https://api.ipify.org?format=json')
		.then(response => response.json())
		.then(data => {
			// data.ip에 IP 주소가 담겨 있음
			setCookie("ip", data.ip, 7); // IP를 2일간 유효한 쿠키로 저장
		})
		.catch(error => {
			console.error('IP 주소 가져오기 실패:', error);
		});
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
