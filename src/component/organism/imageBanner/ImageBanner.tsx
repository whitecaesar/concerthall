"use client";

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";

import { Suspense } from "react";
import { TIMAGE_BANNER_RES } from "@/services/main/MainInfoAxios";

export default function ImageBanner({
	list,
	isFetched,
}: { list: TIMAGE_BANNER_RES[] | undefined } & { isFetched: boolean }) {
	SwiperCore.use([EffectFade, Pagination, Autoplay]);

	const swiperOption: SwiperProps = {
		loop: true,
		//rewind: true,
		spaceBetween: 0,
		slidesPerView: 1,
		centeredSlides: true,
		effect: "fade",
		speed: 1500,
		pagination: {
			type: "progressbar",
		},
		breakpoints: {
			768: {
				spaceBetween: 12,
				slidesPerView: 3,
				effect: "slide",
				rewind: true,
			},
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		modules: [Autoplay, EffectFade, Pagination],
	};

	return (
		isFetched && (
			<div className="imageBannerList">
				<Suspense fallback="로딩중">
					<Swiper {...swiperOption}>
						{list?.map((slide: TIMAGE_BANNER_RES) => (
							<SwiperSlide key={slide.ID_BANNER}>
								<Link href={slide.LINK} target="_blank">
									<Image
										src={slide.CONTENT}
										alt={slide?.ALT}
										width={400}
										height={300}
										priority={true}
										style={{
											width: "100%",
											height: "auto",
										}}
									/>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</Suspense>
			</div>
		)
	);
}
