"use client";
import { useEffect } from "react";
import style from "./Error.module.css";
import { getCookie } from "@/services/common";

const ErrorPage = () => {
	useEffect(() => {
		const handleDOMContentLoaded = () => {
			const searchParams = new URLSearchParams(location.search);

			for (const param of searchParams) {
				const divs = document.getElementsByClassName(param[0]);
				for (const div of divs) {
					div.textContent = param[1];

					if (param[0] === "message") {
						const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
						if (korean.test(param[1])) {
							(div as HTMLElement).style.fontSize = "13px";
						}
					}
				}
			}

			const btn = document.querySelector(".btn");
			btn?.addEventListener("click", handleClick);

			function handleClick() {
				const isMobile = {
					Android: function () {
						return navigator.userAgent.match(/Android/i) !== null;
					},
					iOS: function () {
						return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
					},
					any: function () {
						return isMobile.Android() || isMobile.iOS();
					},
				};

				if (isMobile.any()) {
					if (isMobile.Android()) {
						//window.HifiRose?.reLoad();
						const appType = getCookie("app_type");
						if(appType == "mobile")
						{
							(window as any).HifiRose.reLoad();
						}
						else
						{
							const data = {
								type: " reLoad "
							};
							(window as any).parent.postMessage(data, "*");
							if ((window as any).parent.ReactNativeWebView) {
								(window as any).parent.ReactNativeWebView.postMessage(JSON.stringify(data));
							}
						}
					} else if (isMobile.iOS()) {
						console.log("IOS 호출");
					}
				} else {
					const layout = document.querySelector(".layout") as HTMLElement;
					const container = document.querySelector(
						".loadingContainer"
					) as HTMLElement;

					if (layout && container) {
						layout.style.display = "none";
						container.style.display = "block";

						setTimeout(() => {
							window.location.reload();
						}, 2000);
					}
				}
			}
		};

		document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

		return () => {
			document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
		};
	}, []);

	return (
		<div className={style.ErrorPage}>
			<div className={style.layout}>
				<svg
					className={style.svg}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
				>
					<mask
						id="mask0_1152_1152"
						style={{ maskType: "alpha" }}
						maskUnits="userSpaceOnUse"
						x="0"
						y="0"
						className={style.svg}
					>
						<rect className={style.svg} fill="url(#pattern0_1152_1152)" />
					</mask>
					<g mask="url(#mask0_1152_1152)">
						<rect className={style.svg} fill="#333333" />
					</g>
					<defs>
						<pattern
							id="pattern0_1152_1152"
							patternContentUnits="objectBoundingBox"
							width="1"
							height="1"
						>
							<use
								xlinkHref="#image0_1152_1152"
								transform="scale(0.00195312)"
							/>
						</pattern>
						<image
							id="image0_1152_1152"
							width="512"
							height="512"
							xlinkHref="data:image/png;base64,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"
						/>
					</defs>
				</svg>
				<div className={style.box}>
					<div className={style.title}></div>
					<div className={style.message}></div>
				</div>
				<div className={style.btn}>재시도</div>
			</div>
			<div className={style.loadingContainer}>
				<div className={style.loading}></div>
				<div id="loading-text">loading</div>
			</div>
		</div>
	);
};

export default ErrorPage;
