"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the navigation state
interface NavigationState {
	title: string;
	iconSrc: string;
}

// Define the structure of the navigation context
interface NavigationContextType {
	navState: NavigationState;
	setNavState: (state: NavigationState) => void;
}

// Create the navigation context
const NavigationContext = createContext<NavigationContextType | undefined>(
	undefined
);

// Provider component for the NavigationContext
export const TopNavProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [navState, setNavState] = useState<NavigationState>({
		title: "",
		iconSrc: "",
	});

	return (
		<NavigationContext.Provider value={{ navState, setNavState }}>
			{children}
		</NavigationContext.Provider>
	);
};

// Custom hook to use the NavigationContext
export const useNavigation = () => {
	const context = useContext(NavigationContext);
	if (context === undefined) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return context;
};
