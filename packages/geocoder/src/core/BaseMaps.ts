import {Callable, TData} from '../types';
import * as mapboxgl from 'mapbox-gl';
import {store} from './../index';

type Map = typeof mapboxgl;
export class BaseMaps {
  container: HTMLElement | any;
  _map: Map | undefined;
  options: mapboxgl.MapboxOptions;
  _actions: TData;
  dom: any;
  elClassName: string;

  constructor(options: mapboxgl.MapboxOptions, actions: TData) {
    this.options = options || {};
    // this.dispatch(actions.setOptions(this.options));
    this._actions = actions;
    this.dom = (window as any).document;
    this.elClassName =
      'maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group';
    this.container = null;
  }

  get emptyData() {
    return {
      type: 'geojson',
      data: {type: 'FeatureCollection', features: []}
    };
  }

  get dispatch() {
    return store.dispatch;
  }

  on(type: string, fn: Callable) {
    console.log('on::::', type, fn);
  }
}
