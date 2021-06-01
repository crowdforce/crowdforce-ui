import React from 'react';
import {
  MapContainer, TileLayer, Marker, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

const INITIAL_ZOOM = 11;

const projectPinIcon = new L.Icon({
  iconUrl: '/project-pin.png',
  iconAnchor: [17, 41],
  iconSize: [34, 49],
});

const MapWrapper = (props) => {
  const { onClick } = props;

  useMapEvents({
    click(e) {
      onClick(e);
    },
  });

  return null;
};

const LocationPicker = (props) => {
  const { onChange, lat, lng } = props;

  const handleMarkerMove = ({ latlng }) => {
    onChange(latlng);
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={INITIAL_ZOOM}
      style={{
        height: '100%',
      }}
    >
      <MapWrapper onClick={handleMarkerMove} />
      <TileLayer
        attribution="©OpenStreetMap, ©CartoDB"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <Marker
        draggable
        position={[lat, lng]}
        icon={projectPinIcon}
        eventHandlers={{
          click: () => false,
          mouseup: handleMarkerMove,
        }}
      />
    </MapContainer>
  );
};

LocationPicker.defaultProps = {
  lat: 59.937500,
  lng: 30.308611,
  onChange() {},
};

export default LocationPicker;
