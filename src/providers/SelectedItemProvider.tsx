"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// 컨텍스트 타입 정의
interface SelectedItemContextType {
	selectedItemName: string;
	setSelectedItemName: (name: string) => void;
}

// 컨텍스트 생성
const SelectedItemContext = createContext<SelectedItemContextType | null>(null);

// 컨텍스트 프로바이더 정의
export const SelectedItemProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [selectedItemName, setSelectedItemName] = useState<string>("");

	return (
		<SelectedItemContext.Provider
			value={{ selectedItemName, setSelectedItemName }}
		>
			{children}
		</SelectedItemContext.Provider>
	);
};

// 컨텍스트를 사용하기 위한 커스텀 훅
export const useSelectedItem = () => {
	const context = useContext(SelectedItemContext);
	if (!context) {
		throw new Error(
			"useSelectedItem must be used within a SelectedItemProvider"
		);
	}
	return context;
};
