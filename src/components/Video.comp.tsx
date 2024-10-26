import React, { useState, useEffect, useRef } from "react";
import style from "./Video.module.scss";
import { IVideoCompProps } from "../types/component.interfaces";
import SeekBar from "./SeekBar.comp";
import { formatLikeCount } from "../common/utils";

const buttonData = [
  {
    src: "https://www.vigloo.com/assets/icons/menu/ic_like.svg",
    alt: "like",
    text: (likeCount: string) => likeCount,
  },
  {
    src: "https://www.vigloo.com/assets/icons/menu/ic_keep.svg",
    alt: "keep",
    text: () => "찜",
  },
  {
    src: "https://www.vigloo.com/assets/icons/menu/ic_list.svg",
    alt: "list",
    text: () => "목록",
  },
  {
    src: "https://www.vigloo.com/assets/icons/menu/ic_share.svg",
    alt: "share",
    text: () => "공유",
  },
];

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
      <video
        ref={videoRef}
        poster="https://content.vigloo.com/media/kr013/p02/s01/e004/thumbnails/c9167774495c4bdca9c9b951bbfb4d6b_thumbnail.0000000.jpg"
        id="my-player"
        muted
        onClick={showButtons}
      />
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
          {currentEpisode.current} / {currentEpisode.total}
        </span>
      </div>
      <div
        className={`${style.bottomOverlay} ${
          !buttonVisible ? style.hidden : ""
        }`}
      >
        {buttonData.map((button, index) => (
          <button key={index}>
            <img src={button.src} alt={button.alt} />
            <span style={{ marginLeft: "5px" }}>
              {button.text(formatLikeCount(programData.likeCount))}
            </span>
          </button>
        ))}
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
