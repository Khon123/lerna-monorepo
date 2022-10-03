import { Callable, TData } from '../types';
import * as mapboxgl from 'mapbox-gl';
declare type Map = typeof mapboxgl;
export declare class BaseMaps {
    container: HTMLElement | any;
    _map: Map | undefined;
    options: mapboxgl.MapboxOptions;
    _actions: TData;
    dom: any;
    elClassName: string;
    constructor(options: mapboxgl.MapboxOptions, actions: TData);
    get emptyData(): {
        type: string;
        data: {
            type: string;
            features: never[];
        };
    };
    get dispatch(): any;
    on(type: string, fn: Callable): void;
}
export {};
