import React, { useEffect, useState } from "react";
import useVideoPlayer from "../hooks/useVideoPlayer";
import VideoComp from "../components/Video.comp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { episodeCountState } from "../recoil/programState";
import { IVideoPlayerProps } from "../types/component.interfaces";
import Alert from "../components/Alert.comp";
import { ALERT_MAP_TYPE, IAlertContent } from "../types/data.types";
import BottomSheet from "../components/BottomSheet.comp";

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  programData,
  episodeNumber,
  active,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBottomSheet, setIsBottomSheet] = useState<boolean>(false);
  const [alertKey, setAlertKey] = useState<string>("error");

  const { videoRef, error } = useVideoPlayer(episodeNumber);
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
  }, [active]);

  const alertContents = ALERT_CONTENT_MAP[alertKey];

  return (
    <>
      <VideoComp
        videoRef={videoRef}
        programData={programData}
        currentEpisode={{ total: episodeCount, current: episodeNumber }}
        active={active}
        handleBottomSheet={handleOpentest}
      />
      <Alert
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

const ALERT_CONTENT_MAP: { [key: string]: IAlertContent } = {
  appDownload: {
    title: <>이 에피소드는 앱에서 시청 가능해요!</>,
    contents: (
      <>
        지금 앱에서 더 많은 에피소드를
        <br /> 감상해보세요😎
      </>
    ),
    button: (
      <>
        <img
          src="https://www.vigloo.com/assets/icons/ic_download.svg"
          alt="download"
        />
        앱 다운로드 하기
      </>
    ),
  },
  error: {
    contents: <>[E1007]오류가 발생했습니다. 다시 시도해주세요.</>,
    button: <>확인</>,
  },
};

export default VideoPlayer;
