import qs from 'qs';
export declare const stringToQueryParams: (search?: string) => qs.ParsedQs;
export declare const queryParamsToString: (params?: {}) => string;
export declare const mapQueryParamsToString: (params?: {}) => string;
export declare const mapsQueryMapsId: () => any;
export declare const mapToQueryParam: (center: {
    lng: number;
    lat: number;
}, zoom: number) => string;
export declare const getCenterFromQuery: (slug: string[]) => {
    lat?: undefined;
    lng?: undefined;
    zoom?: undefined;
} | {
    lat: any;
    lng: any;
    zoom: any;
};
export declare const lngLatToString: (lngLat: Record<string, any>) => string;
export declare const changeRoute: (params: any, map: any) => void;
export declare const flyToMarker: (place: any, map: any) => any;
export declare const isLatLonText: (val?: string) => boolean;
export declare const stringToLocation: (location?: string) => string;
export declare const removeMapLayer: (map: any) => void;
export declare const onAddGeoJsonBoundary: (boundary: any, map: any) => void;
