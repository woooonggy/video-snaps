import { atom, selectorFamily } from "recoil";
import { IPlayResponse } from "../types/api.types";

const programId = 15000001;

export const dashUriState = atom<string | null>({
  key: "dashUriState",
  default: null,
});

export const hlsUriState = atom<string | null>({
  key: "hlsUriState",
  default: null,
});

export const fetchDashUrlSelector = selectorFamily<
  string | null,
  { episodeNumber: number }
>({
  key: "fetchDashUrlSelector",
  get:
    ({ episodeNumber }) =>
    async () => {
      try {
        const response = await fetch(
          `/api/play/DASH-15000001-${episodeNumber}`
        );
        const data: IPlayResponse = await response.json();

        if (data.payload && data.payload.url) {
          return data.payload.url;
        }
        return null;
      } catch (error) {
        return null;
      }
    },
});

export const fetchHlsUrlSelector = selectorFamily<
  string | null,
  { episodeNumber: number }
>({
  key: "fetchHlsUrlSelector",
  get:
    ({ episodeNumber }) =>
    async () => {
      try {
        const response = await fetch(
          `/api/play/HLS-${programId}-${episodeNumber}`
        );
        const data: IPlayResponse = await response.json();

        if (data.payload && data.payload.url) {
          return data.payload.url;
        } else {
          console.error("Invalid HLS URL response:", data);
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch HLS URL:", error);
        return null;
      }
    },
});
