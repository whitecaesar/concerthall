import React from "react";
import ExploreResult from "@/component/template/ExploreResult";

export default function ExploreResultPage(key:string) {
	console.log(key);
	return (
		<>
			<div className="exploreResultPage">
				<ExploreResult key={key}/>
			</div>
		</>
	);
}
