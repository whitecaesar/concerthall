// app/layout.tsx  (Server Component)
import type { Metadata } from "next";
import "./globals.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import QueryProviders from "@/providers/QueryClientProvider";
import Header from "@/component/organism/header/Header";
import NoPullToRefresh from "./NoPullToRefresh";

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
			<body
				style={{
					overscrollBehavior: "none",
				}}
			>
				<QueryProviders>
					<SubTitleProvider>
						<Header />
						{/* 새로고침 방지 로직 */}
						<NoPullToRefresh />
						{children}
					</SubTitleProvider>
				</QueryProviders>
			</body>
		</html>
	);
}
