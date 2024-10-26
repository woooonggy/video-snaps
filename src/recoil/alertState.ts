import { atom } from "recoil";
import { ALERT_MAP_TYPE } from "../types/data.types";

export const isOpenState = atom<boolean>({
  key: "isOpenState",
  default: false,
});

export const alertContentsState = atom<ALERT_MAP_TYPE>({
  key: "alertContentsState",
  default: "error",
});
