import type { Metadata } from "next";
import "./globals.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import QueryProviders from "@/providers/QueryClientProvider";
import Header from "@/component/organism/header/Header";

export const metadata: Metadata = {
	title: "하이파이로즈 웹 서비스",
	description: "하이파이로즈 웹 서비스",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<QueryProviders>
					<SubTitleProvider>
						<Header />
						{children}
					</SubTitleProvider>
				</QueryProviders>
			</body>
		</html>
	);
}
