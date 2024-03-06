"use client";

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import {
	EffectFade,
	Pagination,
	Autoplay,
	EffectCoverflow,
} from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { TIMAGE_BANNER_RES } from "@/services/main/MainInfoAxios";

const slideSettings = {
	0: {
		slidesPerView: 1,
	},
	768: {
		slidesPerView: 1.5,
	},
	1200: {
		slidesPerView: 2.5,
	},
};

export default function ImageBanner({
	list,
	isFetched,
}: { list: TIMAGE_BANNER_RES[] | undefined } & { isFetched: boolean }) {
	SwiperCore.use([EffectFade, EffectCoverflow, Pagination, Autoplay]);

	const swiperOption: SwiperProps = {
		loop: true,
		spaceBetween: 0,
		rewind: true,
		slidesPerView: "auto",
		centeredSlides: true,
		grabCursor: true,
		effect: "coverflow",
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 0,
			//modifier: 3.5,
			slideShadows: true,
			//slideShadows: true,
		},
		speed: 1500,
		pagination: {
			type: "progressbar",
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		modules: [Autoplay, EffectFade, EffectCoverflow, Pagination],
	};

	return (
		isFetched && (
			<div className="imageBannerList">
				<Suspense fallback="로딩중">
					<Swiper {...swiperOption} breakpoints={slideSettings}>
						{list?.map((slide: TIMAGE_BANNER_RES) => (
							<SwiperSlide key={slide.ID_BANNER}>
								<Link href={slide.LINK} target="_blank">
									<Image
										src={slide.CONTENT}
										alt={slide?.ALT}
										width={420}
										height={320}
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
