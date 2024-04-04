"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LeftMainNav from "./LeftMainNav";
import LeftSubNav from "./LeftSubNav";
import LeftBackButton from "./LeftBackButton";

export default function LeftMenu({ params }: { params: { slug: string } }) {
	const pathname = usePathname();
	const [isBlank, setIsBlank] = useState<boolean>(false);
	useEffect(() => {
		setIsBlank(
			pathname.indexOf("/RS/main") > -1 ||
				pathname.indexOf("/RS/explore") > -1 ||
				pathname.startsWith("/RS/my")
		);
	}, [pathname]);

	return (
		<>
			{!isBlank ? (
				<LeftBackButton />
			) : (
				<>
					<LeftMainNav />
					<LeftSubNav title="타이틀" />
				</>
			)}
		</>
	);
}
