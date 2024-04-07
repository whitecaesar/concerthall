"use client";
import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";

// Define the structure of the menu item
export interface MenuItem {
	mainId?: number; // main key value
	exploreId?: string;
	myId?: string;
	name: string;
	type: string;
	path?: string;
}

// Define the structure of the menu context
interface MenuContextType {
	menuItems: MenuItem[];
	setMenuItems: (items: MenuItem[]) => void;
	selectedMenuItem: MenuItem | null; // added: currently selected menu item
	setSelectedMenuItem: (item: MenuItem | null) => void; // added: function to set the selected menu item
}

// Create the menu context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Custom hook to use the MenuContext
export const useMenu = () => {
	const context = useContext(MenuContext);
	if (context === undefined) {
		throw new Error("useMenu must be used within a MenuProvider");
	}
	return context;
};

// Provider component for the MenuContext
export const MenuProvider = ({ children }: { children: ReactNode }) => {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
		null
	); // added state

	return (
		<MenuContext.Provider
			value={{ menuItems, setMenuItems, selectedMenuItem, setSelectedMenuItem }}
		>
			{children}
		</MenuContext.Provider>
	);
};
