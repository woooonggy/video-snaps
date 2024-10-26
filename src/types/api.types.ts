export interface ISeason {
  id: number;
  seasonNumber: number;
  episodeCount: number;
  webFreeEpCount: number;
  hasTrailer: boolean;
}

export interface IProgram {
  id: number;
  title: string;
  viewCount: number;
  likeCount: number;
  seasons: ISeason[];
}

export interface IPlay {
  seasonId: number;
  episodeNumber: number;
  url: string;
}

export interface IProgramResponse {
  payload: IProgram;
}

export interface IPlayResponse {
  payload: IPlay;
}
