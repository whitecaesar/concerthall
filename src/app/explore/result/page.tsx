import React from "react";
import ExploreResult from "@/component/template/ExploreResult";

export default function ExploreResultPage({ params }: { params: { key: string } }) {
	return (
		<>
			{<div className="exploreResultPage">
				<ExploreResult key={params.key}/>
			</div>}
		</>
	);
}
