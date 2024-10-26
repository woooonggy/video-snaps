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
