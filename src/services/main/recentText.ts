export interface RecentText {
  play: string;
  album: string;
  track: string;
}

export const recentTexts: { [key: string]: RecentText } = {
  en: {
    play: "Recently Played Playlists",
    album: "Recently Played Albums",
    track: "Recently Played Tracks",
  },
  kr: {
    play: "최근 재생 플레이리스트",
    album: "최근 재생 앨범리스트",
    track: "최근 재생 트랙리스트",
  },
  de: {
    play: "Kürzlich abgespielte Wiedergabelisten",
    album: "Kürzlich abgespielte Alben",
    track: "Kürzlich abgespielte Titel",
  },
  jp: {
    play: "最近再生されたプレイリスト",
    album: "最近再生されたアルバムリスト",
    track: "最近再生されたトラックリスト",
  },
  fr: {
    play: "Listes de lecture récemment jouées",
    album: "Listes d'albums récemment jouées",
    track: "Listes de morceaux récemment joués",
  },
  zh: {
    play: "最近播放的播放列表",
    album: "最近播放的专辑列表",
    track: "最近播放的曲目列表",
  },
};