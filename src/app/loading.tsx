import Image from "next/image";

export default function Loading() {
	return (
		<>
			<div className="loadingBar">
				<Image
					src="/images/img_loading.png"
					alt="Loading"
					width={60}
					height={60}
				/>
			</div>
		</>
	);
}
