"use client";
import React, { useEffect, useState } from "react";
import style from "./PurchaseList.module.css";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { getPurchaseListAxios, PURCHASE_LIST_RESPONSE } from "@/services/contents/PurchaseListAxios";
import PurchaseTrackList from "../trackList/PurchaseTrackList";
import PurchaseAlbumList from "../albumList/PurchaseAlbumList";

type Props = {};

export default function PurchaseList(props: Props) {
	const [activeTab, setActiveTab] = useState<string>("Tab1");
	const [purchaseList, setPurchaseList] = useState<PURCHASE_LIST_RESPONSE>();

	useEffect(() => {
		// const recent = ;
		getPurchaseListAxios().then((data) => setPurchaseList(data));
	}, []);

	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
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
