"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { setCookie, getCookie } from "@/services/common";

interface SubTitleProviderProps {
	children: ReactNode;
}

interface SubTitleContextType {
	subTitle: ReactNode;
	setSubTitle: (title: ReactNode) => void;
}

export const SubTitleContext = createContext<SubTitleContextType>({
	subTitle: "",
	setSubTitle: () => {},
});

export default function SubTitleProvider({ children }: SubTitleProviderProps) {
	// SSR에서는 빈 문자열로 초기화
	const [subTitle, setSubTitle] = useState<ReactNode>("");

	useEffect(() => {
		// 클라이언트 마운트 이후 쿠키에서 제목을 불러옴
		const storedSubtitle = getCookie("subtitle") || "";
		// 주석 처리된 코드 (필요시 활성화)
		 if (storedSubtitle) {
		   setSubTitle(storedSubtitle);
		 }
	}, []);

	useEffect(() => {
		// 쿠키에 저장 (7일간 유효)
		if (subTitle !== undefined && subTitle !== null) {
			// toString()은 문자열이 아닌 ReactNode 값을 처리하기 위함
			setCookie("subtitle", subTitle?.toString() || "", 7);
		}
	}, [subTitle]);

	return (
		<SubTitleContext.Provider value={{ subTitle, setSubTitle }}>
			{children}
		</SubTitleContext.Provider>
	);
}
