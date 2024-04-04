"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedItemContextType {
	selectedItemName: string;
	setSelectedItemName: (name: string) => void;
}

const SelectedItemContext = createContext<SelectedItemContextType | null>(null);

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
