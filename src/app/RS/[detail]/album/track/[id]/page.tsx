import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumTrack from "@/component_RS/albumList/AlbumTrack";

export default function trackPage() {
	return (
		<SubTitleProvider>
			<div className="trackPage">
				<AlbumTrack />
				{/* <TrackList trackList={[]} /> */}
			</div>
		</SubTitleProvider>
	);
}
