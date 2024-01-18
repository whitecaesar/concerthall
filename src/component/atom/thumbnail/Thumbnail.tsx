import Image from "next/image";

interface ImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	//layout?: "fixed" | "intrinsic" | "responsive" | "fill";
	//objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function DetailThumbnail({ src, alt, width, height }: ImageProps) {
	return (
		<Image src={src} alt={alt} width={width} height={height} priority={true} />
	);
}
