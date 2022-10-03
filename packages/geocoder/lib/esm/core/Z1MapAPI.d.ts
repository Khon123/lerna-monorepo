import { CancelledFn } from "../types";
export default class Z1MapAPI {
    api: any;
    constructor();
    getCancelRequest(): import("axios").CancelTokenSource;
    private request;
    private createCancelRequest;
    fetchingPlacesByBoundary(url: string, fnCancelled?: CancelledFn): any;
    fetchPlaceTextSearch(params?: {}, fnCancelled?: CancelledFn): any;
    fetchPlaceNearBySearch(params?: {}, fnCancelled?: CancelledFn): any;
    fetchGeoLocation(at: string, fnCancelled?: CancelledFn): any;
    fetchWhatHereBorey(location: string, fnCancelled?: CancelledFn): any;
}
export declare const z1MapAPI: Z1MapAPI;
