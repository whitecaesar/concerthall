"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface MenuItem {
	name: string;
	path: string;
}

interface MenuContextType {
	menuItems: MenuItem[];
	setMenuItems: (items: MenuItem[]) => void;
	selectedMenuItem: MenuItem | null; // 추가: 현재 선택된 메뉴 아이템
	setSelectedMenuItem: (item: MenuItem | null) => void; // 추가: 선택된 메뉴 아이템을 설정하는 함수
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
	const context = useContext(MenuContext);
	if (context === undefined) {
		throw new Error("useMenu must be used within a MenuProvider");
	}
	return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
		null
	); // 상태 추가

	return (
		<MenuContext.Provider
			value={{ menuItems, setMenuItems, selectedMenuItem, setSelectedMenuItem }}
		>
			{children}
		</MenuContext.Provider>
	);
};
