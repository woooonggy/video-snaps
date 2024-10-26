import React, { useEffect, useState } from "react";
import useVideoPlayer from "../hooks/useVideoPlayer";
import VideoComp from "../components/Video.comp";
import { useRecoilValue } from "recoil";
import { episodeCountState } from "../recoil/programState";
import { IVideoPlayerProps } from "../types/component.interfaces";
import AlertComp from "../components/Alert.comp";
import { ALERT_MAP_TYPE } from "../types/data.types";
import BottomSheet from "../components/BottomSheet.comp";
import { ALERT_CONTENT_MAP } from "../common/constants.comp";

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  programData,
  episodeNumber,
  active,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBottomSheet, setIsBottomSheet] = useState<boolean>(false);
  const [alertKey, setAlertKey] = useState<string>("error");

  const { videoRef, error, browser, drmType } = useVideoPlayer(episodeNumber);
  const episodeCount = useRecoilValue(episodeCountState);

  const handleOpentest = () => {
    setIsBottomSheet(true);
  };
  const handleOpen = (alertType: ALERT_MAP_TYPE) => {
    setAlertKey(alertType);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (active && (error || episodeNumber !== 0)) {
      handleOpen(error ? "error" : "appDownload");
    }

    // browser, drmType 확인용
    console.log("browser-drmType", browser, drmType);
  }, [active]);

  const alertContents = ALERT_CONTENT_MAP[alertKey];

  return (
    <>
      <VideoComp
        videoRef={videoRef}
        programData={programData}
        currentEpisode={{ total: episodeCount, current: episodeNumber }}
        active={active}
        handleAlertOpen={handleOpen}
        handleBottomSheet={handleOpentest}
      />
      <AlertComp
        open={isOpen}
        onClose={handleClose}
        alertContents={alertContents}
      />
      <BottomSheet
        isOpen={isBottomSheet}
        setIsOpen={setIsBottomSheet}
        programData={programData}
        episodeCount={episodeCount}
      />
    </>
  );
};

export default VideoPlayer;
