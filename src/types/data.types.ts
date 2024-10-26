export interface IUseVideoPlayer {
  videoRef: React.RefObject<HTMLVideoElement>;
  browser: string;
  drmType: string;
  error: boolean;
}
