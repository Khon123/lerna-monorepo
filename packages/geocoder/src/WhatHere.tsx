import {LngLat, TData} from './types';
import {BaseMaps} from './core';
import {latLngToString} from './utils';
import {WhatHereView} from './components';
import {createRoot} from 'react-dom/client';
import {fetchWhatHere, reset} from './@redux/reducers/whathere';
import {useSubscribe} from './@redux';
import maplibre from 'maplibre-gl';
import {MapboxOptions} from 'mapbox-gl';

const actions = {fetchWhatHere, reset};
interface IOption extends MapboxOptions {
  position: 'bottom-center' | 'bottom-top';
}

export default class WhatHere extends BaseMaps {
  elUI: HTMLElement | any;
  storeUnsubscribe: any;
  marker: any;
  _map: any;
  options: IOption;

  constructor(options?: IOption) {
    super(options as IOption, actions);
  }

  onAdd(map: any) {
    this._map = map;
    const dom = (global as any).document;
    this.container = dom.createElement('div');
    this.createRootDom();
    this.subscribedActions();
    return this.container;
  }

  createRootDom() {
    const mapRoot = this._map._controlContainer;
    const klass = 'maplibregl-ctrl-what-here mapboxgl-ctrl-what-here';
    const position = this.options?.position || '';
    if (!this.elUI) {
      this.elUI = (global as any).document.createElement('div');
      mapRoot.appendChild(this.elUI);
      const root = createRoot(this.elUI);
      root.render(<WhatHereView map={this._map} reset={reset} />);
    }
    this.elUI.className = `${klass} ${position}`;
  }

  subscribedActions() {
    if (!this._map) return;
    const onStateChange = ({location}: TData) => {
      if (location) {
        this.createMarker(location);
      } else {
        this.marker?.remove();
      }
    };
    this.storeUnsubscribe = useSubscribe(
      ({whathere}) => ({
        location: whathere.location
      }),
      onStateChange
    );
  }

  onRemove(map: any) {
    console.log('maps===', map);
    this.container?.parentNode?.removeChild(this.container);
    this.elUI?.remove();
    if (this.storeUnsubscribe) {
      this.storeUnsubscribe();
      delete this.storeUnsubscribe;
    }
    this.marker?.remove();
    this.marker = null;
    this.dispatch(reset());
    return this;
  }

  createMarker(at: string) {
    this.marker?.remove();
    const [lat, lng]: any = at.split(',');
    const el = (global as any).document.createElement('div');
    el.className = 'marker-what-here';
    this.marker = new maplibre.Marker(el)
      .setLngLat([lng, lat])
      .addTo(this._map);
  }

  async fetchWhathere(lngLat: LngLat) {
    const location = latLngToString(lngLat);
    return this.dispatch(fetchWhatHere({location}));
  }
}
