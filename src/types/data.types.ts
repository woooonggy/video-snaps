export interface IUseVideoPlayer {
  videoRef: React.RefObject<HTMLVideoElement>;
  browser: string;
  drmType: string;
  error: boolean;
}
export interface IEpisodeData {
  episodeNumber: number;
  title: string;
  viewCount: number;
  likeCount: number;
}

export interface ISlideData {
  id: number;
  videoContent: React.ReactNode;
}

export interface IAlertContent {
  title?: React.ReactNode;
  contents?: React.ReactNode;
  button: React.ReactNode;
}

export type ALERT_MAP_TYPE = "appDownload" | "error";
