import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "./recoilPersistStorage";

export interface PositionDataType {
  coords: {
    x: number;
    y: number;
  };
  address?: string;
}

export const PositionSate = atom<PositionDataType>({
  key: "position",
  default: {
    coords: {
      x: 0,
      y: 0,
    },
    address: "",
  },
});
