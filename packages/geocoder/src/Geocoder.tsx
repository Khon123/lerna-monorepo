import {omit} from 'lodash';
import {BaseMaps} from './core';
import {createRoot} from 'react-dom/client';
import {Search} from './components';
import {MapboxOptions} from 'mapbox-gl';

interface GeocoderMapBoxOptions extends MapboxOptions {
  onChange?(text: string): any;
}
const actions = {};
export default class Geocoder extends BaseMaps {
  storeUnsubscribe: any;
  customComponent: any;
  onChange: any;

  constructor(options?: GeocoderMapBoxOptions) {
    const _options = omit(options, ['onChange']);
    super(_options, actions);
    if (options?.onChange) this.onChange = options.onChange;
  }

  static get actions(): typeof actions {
    return actions;
  }

  // get dispatch() {
  //   return store.dispatch;
  // }

  onAdd(map: any) {
    this._map = map;
    let _this = this;
    const dom = (global as any).document;
    const el = (_this.container = dom.createElement('div'));
    el.id = 'x-z1data-geocoder';
    el.className =
      'mapboxgl-ctrl-geocoder maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group';
    const root = createRoot(el);
    root.render(<Search maps={this._map} onChange={this.onChange} />);
    return el;
  }

  onRemove(map: any) {
    this.container.parentNode.removeChild(this.container);
    if (map.getSource('geocoder')) map.removeSource('geocoder');
    this._map = undefined;
    return this;
  }

  mapState() {
    if (!this._map) return;
  }
}
