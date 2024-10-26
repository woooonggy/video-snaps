import React, { useState, useEffect, useRef } from "react";
import style from "./Video.module.scss";
import { IVideoCompProps } from "../types/component.interfaces";
import SeekBar from "./SeekBar.comp";
import { formatLikeCount } from "../common/util";

const VideoComp: React.FC<IVideoCompProps> = ({
  videoRef,
  programData,
  currentEpisode,
  active,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isPlayingRef = useRef(false);
  const hideButtonTimeout = useRef<number | null>(null);

  const handlePlayPause = () => {
    const video = videoRef?.current;
    if (video && active) {
      if (isPlayingRef.current) {
        video.pause();
        isPlayingRef.current = false;
      } else {
        video.play();
        isPlayingRef.current = true;
      }
    }
    showButtons();
  };

  const showButtons = () => {
    setButtonVisible(true);
    if (hideButtonTimeout.current) {
      clearTimeout(hideButtonTimeout.current);
    }
    hideButtonTimeout.current = setTimeout(() => {
      setButtonVisible(false);
    }, 2000);
  };

  const handleInputChange = (time: number) => {
    const video = videoRef?.current;
    if (video) {
      const newTime = time;
      video.currentTime = newTime;
    }
  };

  useEffect(() => {
    const video = videoRef?.current;
    if (!video || !active) return;

    hideButtonTimeout.current = setTimeout(() => {
      setButtonVisible(false);
    }, 2000);

    const handleTimeUpdate = () => {
      window.requestAnimationFrame(() => {
        setCurrentTime(video.currentTime);
      });
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    video
      .play()
      .then(() => (isPlayingRef.current = true))
      .catch(() => {
        video.pause();
        isPlayingRef.current = false;
      });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (hideButtonTimeout.current) {
        clearTimeout(hideButtonTimeout.current);
      }
    };
  }, [active, videoRef]);

  return (
    <section className={style.section}>
      <video ref={videoRef} id="my-player" muted onClick={showButtons} />
      {!isPlayingRef.current && (
        <button
          ref={buttonRef}
          onClick={handlePlayPause}
          className={`${style.playButton} ${
            !buttonVisible ? style.hidden : ""
          }`}
        >
          ▶️
        </button>
      )}
      <div
        className={`${style.topOverlay} ${!buttonVisible ? style.hidden : ""}`}
      >
        <button>
          <img
            src="https://www.vigloo.com/assets/icons/ic_back.svg"
            alt="share"
          />
        </button>
        <span>{programData.title}</span>
        <span>
          {currentEpisode.current} /{currentEpisode.total}
        </span>
      </div>
      <div
        className={`${style.bottomOverlay} ${
          !buttonVisible ? style.hidden : ""
        }`}
      >
        <button>
          <img
            src="https://www.vigloo.com/assets/icons/menu/ic_like.svg"
            alt="like"
          />
          <span style={{ marginLeft: "5px" }}>
            {formatLikeCount(programData.likeCount)}
          </span>
        </button>
        <button>
          <img
            src="https://www.vigloo.com/assets/icons/menu/ic_keep.svg"
            alt="keep"
          />
          <span style={{ marginLeft: "5px" }}>찜</span>
        </button>
        <button>
          <img
            src="https://www.vigloo.com/assets/icons/menu/ic_list.svg"
            alt="list"
          />
          <span style={{ marginLeft: "5px" }}>목록</span>
        </button>
        <button>
          <img
            src="https://www.vigloo.com/assets/icons/menu/ic_share.svg"
            alt="share"
          />
          <span style={{ marginLeft: "5px" }}>공유</span>
        </button>
      </div>
      <SeekBar
        isPlaying={isPlayingRef.current}
        isVisible={buttonVisible}
        duration={duration}
        currentTime={currentTime}
        onPlayPause={handlePlayPause}
        onSeek={handleInputChange}
      />
    </section>
  );
};

export default VideoComp;
