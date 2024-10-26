import { selector } from "recoil";
import { IProgramResponse } from "../types/api.types";

export const defaultProgramResponse: IProgramResponse = {
  payload: {
    id: 0,
    title: "",
    viewCount: 0,
    likeCount: 0,
    seasons: [
      {
        id: 0,
        seasonNumber: 0,
        episodeCount: 0,
        webFreeEpCount: 0,
        hasTrailer: false,
      },
    ],
  },
};

export const episodeCountState = selector<number>({
  key: "episodeCountState",
  get: ({ get }) => {
    const programData = get(programSelector);
    return programData?.payload.seasons[0].episodeCount || 0;
  },
});

export const programSelector = selector<IProgramResponse | null>({
  key: "programSelector",
  get: async () => {
    const programId = 15000001;
    try {
      const response = await fetch(`/api/programs/${programId}`);
      const data: IProgramResponse = await response.json();
      return data;
    } catch (error) {
      return defaultProgramResponse;
    }
  },
});
