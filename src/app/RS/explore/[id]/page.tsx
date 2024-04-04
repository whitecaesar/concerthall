import Explore from "@/component_RS/template/Explore";

export default function ExplorePage({ params }: { params: { id: string } }) {
	return (
		<div className="explorePage">
			<Explore slug={params.id} />
		</div>
	);
}
