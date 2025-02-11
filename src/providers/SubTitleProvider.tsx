"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

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
	// 서버와 클라이언트 모두에서 초기값은 항상 빈 문자열(""), 
	// 이렇게 하면 SSR 시에 출력된 내용과 클라이언트의 초기 상태가 일치합니다.
	const [subTitle, setSubTitle] = useState<ReactNode>("");

	// 클라이언트가 마운트된 후 localStorage에서 subtitle 값을 불러와 상태를 업데이트합니다.
	useEffect(() => {
		const storedSubtitle = localStorage.getItem("subtitle") || "";
		setSubTitle(storedSubtitle);
	}, []);

	// subTitle이 변경될 때마다 localStorage에 저장합니다.
	useEffect(() => {
		localStorage.setItem("subtitle", subTitle?.toString() || "");
	}, [subTitle]);

	return (
		<SubTitleContext.Provider value={{ subTitle, setSubTitle }}>
			{children}
		</SubTitleContext.Provider>
	);
}
