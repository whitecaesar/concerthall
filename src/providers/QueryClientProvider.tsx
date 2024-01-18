"use client";

import {
	QueryClient,
	QueryClientProvider as LibraryQueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function QueryClientProvider({ children }: Props) {
	const queryClient = new QueryClient({
		defaultOptions: {},
	});
	return (
		<>
			<LibraryQueryClientProvider client={queryClient}>
				{children}
			</LibraryQueryClientProvider>
		</>
	);
}
