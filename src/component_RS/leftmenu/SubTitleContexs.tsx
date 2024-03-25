// SubTitleContext.js (확장)
import React, { createContext, useContext, useState } from "react";

const SubTitleContext = createContext({
	subTitle: "",
	setSubTitle: () => {},
	menuItems: [],
	setMenuItems: () => {},
});

export const useSubTitle = () => useContext(SubTitleContext);

export const SubTitleProvider = ({ children }) => {
	const [subTitle, setSubTitle] = useState("");
	const [menuItems, setMenuItems] = useState([]);

	return (
		<SubTitleContext.Provider
			value={{ subTitle, setSubTitle, menuItems, setMenuItems }}
		>
			{children}
		</SubTitleContext.Provider>
	);
};
