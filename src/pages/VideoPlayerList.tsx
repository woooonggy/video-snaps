import React, { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import SwiperComp from "../components/Swiper.comp";
import VideoPlayer from "./VideoPlayer";
import {
  defaultProgramResponse,
  episodeCountState,
  programSelector,
} from "../recoil/programState";
import { IProgramResponse } from "../types/api.types";

const VideoPlayerList: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const programLoadable = useRecoilValueLoadable(programSelector);
  const episodeCountLoadable = useRecoilValueLoadable(episodeCountState);

  const programData: IProgramResponse =
    programLoadable.state === "hasValue" && programLoadable.contents
      ? programLoadable.contents
      : defaultProgramResponse;
  const episodeCount =
    episodeCountLoadable.state === "hasValue"
      ? episodeCountLoadable.contents
      : 0;

  useEffect(() => {
    if (programLoadable.state === "hasError") {
      console.error("Failed to api program");
    }
  }, [programLoadable]);

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex);
  };

  const slides = Array.from({ length: episodeCount + 1 }).map((_, index) => ({
    id: index,
    videoContent: (
      <VideoPlayer
        key={index}
        programData={programData.payload}
        episodeNumber={index}
        active={activeSlide === index}
      />
    ),
  }));

  return <SwiperComp slides={slides} onSlideChange={handleSlideChange} />;
};

export default VideoPlayerList;
