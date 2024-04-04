import AlbumTrack from "@/component_RS/albumList/AlbumTrack";

export default function trackPage({ params }: { params: { id: string } }) {
	return (
		<div className="trackPage">
			<AlbumTrack slug={params.id} />
		</div>
	);
}
