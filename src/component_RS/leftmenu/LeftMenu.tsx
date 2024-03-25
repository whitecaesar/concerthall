// "use client";
// import { useMemo, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import LeftMainNav from "./LeftMainNav";
// import LeftSubNav from "./LeftSubNav";

// export default function LeftMenu() {
// 	const path = usePathname();
// 	const ynMainNav = useMemo(
// 		() => path === "/RS/my" || path === "/RS/explore" || path === "/RS/main",
// 		[path]
// 	);

// 	useEffect(() => {
// 		// path 변수가 변경될 때 특정 작업을 수행
// 	}, [path]);

// 	//return <>{ynMainNav ? <LeftMainNav /> : <LeftSubNav title="타이틀" />}</>;
// 	return (
// 		<>
// 			<LeftMainNav /> <LeftSubNav title="타이틀" />
// 		</>
// 	);
// }
// "use client"를 사용하여 클라이언트 측에서만 실행되게 함
"use client";
import { useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import LeftMainNav from "./LeftMainNav";
import LeftSubNav from "./LeftSubNav";

export default function LeftMenu() {
	const path = usePathname();

	useEffect(() => {
		// 만약 경로 변경 시 수행해야 할 작업이 있다면 여기에 구현
	}, [path]);

	return (
		<>
			<LeftMainNav />
			<LeftSubNav title="타이틀" />
		</>
	);
}
