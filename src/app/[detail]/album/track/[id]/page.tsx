import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumTrack from "@/component/template/AlbumTrack";

export default function trackPage() {
	return (
		<SubTitleProvider>
			<div className="trackPage">
				<AlbumTrack />
			</div>
		</SubTitleProvider>
	);
}
