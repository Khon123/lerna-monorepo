export declare type TData = Record<string, any>;
export declare type Callable = (...args: any[]) => any;
export declare type Coords = number[];
export declare type CancelledFn = (source: any) => any | any;
export declare type Params = Record<string, any>;
export declare type Method = "GET" | "POST" | "PUT" | "DELETE";
export interface LngLat {
    lng: number;
    lat: number;
}
