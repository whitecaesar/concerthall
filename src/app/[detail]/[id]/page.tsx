import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumDetail from "@/component/template/AlbumDetail";

export default function page() {
	return (
		<SubTitleProvider>
			<div className="detailPage">
				<AlbumDetail />
			</div>
		</SubTitleProvider>
	);
}
