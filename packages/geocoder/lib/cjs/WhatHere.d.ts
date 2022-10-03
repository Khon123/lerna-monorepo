import { LngLat } from './types';
import { BaseMaps } from './core';
import { MapboxOptions } from 'mapbox-gl';
interface IOption extends MapboxOptions {
    position: 'bottom-center' | 'bottom-top';
}
export default class WhatHere extends BaseMaps {
    elUI: HTMLElement | any;
    storeUnsubscribe: any;
    marker: any;
    _map: any;
    options: IOption;
    constructor(options?: IOption);
    onAdd(map: any): any;
    createRootDom(): void;
    subscribedActions(): void;
    onRemove(map: any): this;
    createMarker(at: string): void;
    fetchWhathere(lngLat: LngLat): Promise<any>;
}
export {};
