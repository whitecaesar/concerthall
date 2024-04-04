"use client";
import React, { createContext, useState, ReactNode } from "react";

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
	const [subtitle, setSubTitle] = useState<ReactNode>("");

	const setSubTitleFn = (chgSubtitle: ReactNode) => {
		//console.log("chg subtitme", chgSubtitle);
		setSubTitle(chgSubtitle);
	};

	return (
		<SubTitleContext.Provider
			value={{ subTitle: subtitle, setSubTitle: setSubTitleFn }}
		>
			{children}
		</SubTitleContext.Provider>
	);
}
