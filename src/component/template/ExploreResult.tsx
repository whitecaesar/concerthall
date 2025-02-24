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

export const texts: { [key: string]: Texts } = {
  en: { artist: "Artist" },
  US: { artist: "Artist" },
  ko: { artist: "아티스트" },
  KR: { artist: "아티스트" },
  de: { artist: "Künstler" },
  DE: { artist: "Künstler" },
  es: { artist: "Artista" },
  ES: { artist: "Artista" },
  fr: { artist: "Artiste" },
  FR: { artist: "Artiste" },
  it: { artist: "Artista" },
  IT: { artist: "Artista" },
  nl: { artist: "Artiest" },
  NL: { artist: "Artiest" },
  ja: { artist: "アーティスト" },
  JP: { artist: "アーティスト" },
  zh: { artist: "艺术家" },
  CN: { artist: "艺术家" },
  tw: { artist: "藝術家" },
  TW: { artist: "藝術家" },
  ru: { artist: "Артист" },
  RU: { artist: "Артист" },
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
