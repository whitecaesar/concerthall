import type { Metadata } from "next";
import "./rs_globals.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import QueryProviders from "@/providers/QueryClientProvider";
import LeftMenu from "@/component_RS/leftmenu/LeftMenu";

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
						<div className="rs-wrap">
							<LeftMenu />
							{children}
						</div>
					</SubTitleProvider>
				</QueryProviders>
			</body>
		</html>
	);
}
