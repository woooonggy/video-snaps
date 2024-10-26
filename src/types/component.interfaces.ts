import * as d from "./data.types";
import * as a from "./api.types";

export interface IVideoCompProps {
  videoRef: React.RefObject<HTMLVideoElement> | null;
  programData: a.IProgram;
  currentEpisode: { total: number; current: number };
  active: boolean;
  handleBottomSheet: () => void;
}

export interface ISwiperCompProps {
  slides: d.ISlideData[];
  onSlideChange?: (swiper: any) => void;
}

export interface IVideoPlayerProps {
  programData: a.IProgram;
  episodeNumber: number;
  active: boolean;
}

export interface IAlertProps {
  open: boolean;
  onClose: () => void;
  alertContents: d.IAlertContent;
}
