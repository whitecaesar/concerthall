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
	// SSR에서는 빈 문자열로 초기화 (서버환경에서는 localStorage 접근 불가)
	const [subTitle, setSubTitle] = useState<ReactNode>("");

	useEffect(() => {
		// 클라이언트 마운트 이후 localStorage에서 제목을 불러올 수도 있음
		const storedSubtitle = localStorage.getItem("subtitle") || "";
		setSubTitle(storedSubtitle);
	}, []);

	useEffect(() => {
		localStorage.setItem("subtitle", subTitle?.toString() || "");
	}, [subTitle]);

	return (
		<SubTitleContext.Provider value={{ subTitle, setSubTitle }}>
			{children}
		</SubTitleContext.Provider>
	);
}
