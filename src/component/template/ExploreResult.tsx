"use client";
import React, { useEffect, useState } from "react";
import SubTitleProvider from "@/providers/SubTitleProvider";
import SingleList from "@/component/organism/singleList/SingleList";
import { getExploreResults, TRESULT_LIST_RESPONSE } from "@/services/explore/ExploreResultAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";
import ErrorPage from "../organism/error/Error";
import AlbumList from "../organism/albumList/AlbumList";
import ExploreArtistList from "../organism/artistList/ExploreArtistList";

interface ExploreResultProps {
  exploreKey?: string; 
}

interface Texts {
  artist: string;
}

const texts: { [key: string]: Texts } = {
  en: { artist: "Artist" },
  kr: { artist: "아티스트" },
  de: { artist: "Artist" },
  jp: { artist: "Artist" },
  fr: { artist: "Artist" },
  zh: { artist: "Artist" },
};

export default function ExploreResult({ exploreKey }: ExploreResultProps) {
  const [error, setError] = useState<string | null>(null);
  const [exploreResult, setExploreResult] = useState<TRESULT_LIST_RESPONSE>();

  useEffect(() => {
    if (exploreKey) {
      getExploreResults(exploreKey)
        .then((exploreData) => setExploreResult(exploreData))
        .catch((error) => {
          setError(error.message); // 에러 메시지 설정
        });
    }
  }, [exploreKey]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <SubTitleProvider>
      <div className="exploreResultPage">
        {exploreResult?.RECOMMEND_LIST.map((content: VIEWALL_LIST_TYPE) => {
          return (
            <div key={content.ID}>
              {content.TYPE === "TRACK" ? (
                <SingleList showTitle={true} recommendList={content} />
              ) : (
                <AlbumList showTitle={true} recommendList={content} />
              )}
            </div>
          );
        })}

        {exploreResult && <ExploreArtistList artistList={exploreResult.ARTIST_LIST} />}
      </div>
    </SubTitleProvider>
  );
}
