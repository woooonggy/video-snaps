import React from "react";
import style from "./SeekBar.module.scss";
import { formatTime } from "../common/util";

const SeekBar: React.FC<{
  isPlaying: boolean;
  isVisible: boolean;
  duration: number;
  currentTime: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
}> = ({ isPlaying, isVisible, duration, currentTime, onPlayPause, onSeek }) => {
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div
      className={`${style.seekBarContainer} ${!isVisible ? style.hidden : ""}`}
    >
      <input
        type="range"
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        onChange={(e) => onSeek(parseFloat(e.target.value))}
        className={style.seekBar}
        style={{
          background: `linear-gradient(to right, white ${progressPercentage}%, #555 ${progressPercentage}%)`,
        }}
      />
      <div className={style.timeDisplay}>
        <button onClick={onPlayPause}>{isPlaying ? "⏸" : "▶️"}</button>
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button>
          <img
            src="https://www.vigloo.com/assets/icons/video/ic_caption.svg"
            alt="share"
          />
        </button>
      </div>
    </div>
  );
};

export default SeekBar;
