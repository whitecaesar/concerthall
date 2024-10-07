import React from "react";
import ExploreResult from "@/component/template/ExploreResult";

export default function ExploreResultPage({ params }: { params: { search: string } }) {
	return (
		<>
			{<div className="exploreResultPage">
				<ExploreResult exploreKey={params.search}/>
			</div>}
		</>
	);
}
