"use client";
import React, { useEffect, useState } from "react";
import style from "./PurchaseList.module.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { getPurchaseListAxios, PURCHASE_LIST_RESPONSE } from "@/services/contents/PurchaseListAxios";
import PurchaseTrackList from "../trackList/PurchaseTrackList";
import PurchaseAlbumList from "../albumList/PurchaseAlbumList";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

export default function PurchaseList(props: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	
	// URL에서 tab 파라미터 읽기 (없으면 기본값 "Tab1" 사용)
	const tabParam = searchParams.get('tab');
	const [activeTab, setActiveTab] = useState<string>(tabParam || "Tab1");
	
	const [purchaseList, setPurchaseList] = useState<PURCHASE_LIST_RESPONSE>();

	useEffect(() => {
		// const recent = ;
		getPurchaseListAxios().then((data) => setPurchaseList(data));
	}, []);
	
	// URL 파라미터 변경 시 탭 업데이트
	useEffect(() => {
		if (tabParam) {
			setActiveTab(tabParam);
		}
	}, [tabParam]);

	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
		
		// URL 쿼리 파라미터 업데이트
		const url = new URL(window.location.href);
		url.searchParams.set('tab', tabName);
		router.replace(url.pathname + url.search);
	};

	return (
		<>
			<SubTitleProvider>
				<div className={style.tab}>
					{purchaseList?.PURCHASED_TRACKS.length != 0 && (
						<button
							className={activeTab === "Tab1" ? style.active : ""}
							onClick={() => handleTabClick("Tab1")}
						>
							Tracks({purchaseList?.PURCHASED_TRACKS.length})
						</button>
					)}
					{purchaseList?.PURCHASED_ALBUMS.length != 0 && (
						<button
							className={activeTab === "Tab2" ? style.active : ""}
							onClick={() => handleTabClick("Tab2")}
						>
							Albums({purchaseList?.PURCHASED_ALBUMS.length})
						</button>
					)}
					{purchaseList?.PURCHASED_TRACKS.length == 0 && purchaseList?.PURCHASED_ALBUMS.length == 0 && (
						<div>구매한 컨텐츠가 없습니다.</div>
					)}
				</div>


				<div className={style.tabContent}>
					{activeTab === "Tab1" && (
						<div>
							{purchaseList?.PURCHASED_TRACKS && <PurchaseTrackList PurchaseTrackList={purchaseList?.PURCHASED_TRACKS}/>}
						</div>
					)}
					{activeTab === "Tab2" && (
						<div>
							{purchaseList?.PURCHASED_ALBUMS && <PurchaseAlbumList albumList={purchaseList?.PURCHASED_ALBUMS}/>} 
						</div>
					)}
				</div>
			</SubTitleProvider>
		</>
	);
}
