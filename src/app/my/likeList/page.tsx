import SingleViewAll from "@/component/template/SingleViewAll";
import SubTitleProvider from "@/providers/SubTitleProvider";

export default function LikeList() {
	return (
		<div className="likeListPage">
			<SubTitleProvider>
				<SingleViewAll />
			</SubTitleProvider>
		</div>
	);
}
