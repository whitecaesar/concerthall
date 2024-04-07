import Main from "@/component_RS/template/Main";

export default function recommandPage({ params }: { params: { id: string } }) {
	return (
		<div className="mainPage">
			<Main slug={`${params.id}`} />
		</div>
	);
}
