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
			setCookie("token", token, 2);
			setCookie("app_type", app_type, 2);
			setCookie("lang", lang, 2); 
			setCookie("userid", userid, 2);
		};

		window.logout = () => {
			deleteCookie("token");
			deleteCookie("app_type");
			deleteCookie("lang");
			deleteCookie("userid");
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
