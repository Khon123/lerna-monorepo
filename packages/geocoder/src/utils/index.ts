import { LngLat } from "../types";
export * from "./helpers";

export const latLngToString = (lngLat: LngLat) => {
  return `${lngLat.lat.toFixed(8)},${lngLat.lng.toFixed(8)}`;
};
