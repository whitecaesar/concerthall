import "./rs_globals.css";
import QueryProviders from "@/providers/QueryClientProvider";
import SubTitleProvider from "@/providers/SubTitleProvider";
import LeftMenu from "@/component_RS/navigation/LeftMenu";
import TopNav from "@/component_RS/navigation/topNav";
import { MenuProvider } from "@/providers/RSMenuProvider";
import { SelectedItemProvider } from "@/providers/SelectedItemProvider";
import { TopNavProvider } from "@/providers/TopNavProvider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<MenuProvider>
				<QueryProviders>
					<SubTitleProvider>
						<TopNavProvider>
							<SelectedItemProvider>
								<div className="rs-wrap">
									<LeftMenu />
									<div className="rs-container">
										<TopNav />
										{children}
									</div>
								</div>
							</SelectedItemProvider>
						</TopNavProvider>
					</SubTitleProvider>
				</QueryProviders>
			</MenuProvider>
		</div>
	);
}
