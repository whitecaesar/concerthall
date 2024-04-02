// TopNavProvider.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationState {
	title: string;
	iconSrc: string;
}

interface NavigationContextType {
	navState: NavigationState;
	setNavState: (state: NavigationState) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
	undefined
);

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

export const useNavigation = () => {
	const context = useContext(NavigationContext);
	if (context === undefined) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return context;
};
