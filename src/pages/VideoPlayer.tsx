import React, { useEffect } from "react";
import useVideoPlayer from "../hooks/useVideoPlayer";
import VideoComp from "../components/Video.comp";
import { useRecoilValue } from "recoil";
import { episodeCountState } from "../recoil/programState";
import { IVideoPlayerProps } from "../types/component.interfaces";

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  programData,
  episodeNumber,
  active,
}) => {
  const { videoRef, error } = useVideoPlayer(episodeNumber);
  const episodeCount = useRecoilValue(episodeCountState);

  useEffect(() => {
    if (active && error) {
      alert(error);
    }
  }, [active]);

  return (
    <VideoComp
      videoRef={videoRef}
      programData={programData}
      currentEpisode={{ total: episodeCount, current: episodeNumber }}
      active={active}
    />
  );
};

export default VideoPlayer;
