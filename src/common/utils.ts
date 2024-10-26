/**
 * 비디오 좋아요 수 포맷팅
 * @param count
 * @returns string
 */
export const formatLikeCount = (count: number): string => {
  if (count >= 1000) {
    return (
      (count / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) +
      "k"
    );
  }
  return count.toLocaleString();
};

/**
 * 비디오 시간 포맷팅
 * @param time
 * @returns string
 */
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};
