import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const INITIAL_POSITION = {
  lat: 55.167681,
  lng: 61.391041,
};
const INITIAL_ZOOM = 12;

const Map = () => (
  <div className="map-root">
    <LeafletMap
      center={[INITIAL_POSITION.lat, INITIAL_POSITION.lng]}
      zoom={INITIAL_ZOOM}
      style={{
        height: '600px',
        transform: 'translate3D(0,0,0)',
      }}
    >
      <TileLayer
        attribution="©OpenStreetMap, ©CartoDB"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
    </LeafletMap>
  </div>
);

export default Map;
