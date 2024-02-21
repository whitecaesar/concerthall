import SubTitleProvider from "@/providers/SubTitleProvider";
import SingleViewAll from "@/component/template/SingleViewAll";

export default function ViewAllSingle() {
	return (
		<>
			<SubTitleProvider>
				<div className="datailSinglePage">
					<SingleViewAll />
				</div>
			</SubTitleProvider>
		</>
	);
}
