import React from "react";
import Artist from "@/component/template/Artist";

export default function ArtistPage({ params }: { params: { id: string } }) {
	return (
		<div className="artistPage">
			<Artist album_id={params.id} />
		</div>
	);
}
