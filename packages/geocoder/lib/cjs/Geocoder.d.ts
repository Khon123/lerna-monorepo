import { BaseMaps } from './core';
import { MapboxOptions } from 'mapbox-gl';
interface GeocoderMapBoxOptions extends MapboxOptions {
    onChange?(text: string): any;
}
declare const actions: {};
export default class Geocoder extends BaseMaps {
    storeUnsubscribe: any;
    customComponent: any;
    onChange: any;
    constructor(options?: GeocoderMapBoxOptions);
    static get actions(): typeof actions;
    onAdd(map: any): any;
    onRemove(map: any): this;
    mapState(): void;
}
export {};
