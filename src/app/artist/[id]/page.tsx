import React from "react";
import ArtistInfo from "@/component/template/Artist";

export default function ArtistPage({ params }: { params: { id: string } }) {
	return (
		<div className="artistPage">
			<ArtistInfo artist_id={params.id} />
		</div>
	);
}
