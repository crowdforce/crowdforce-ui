import React from 'react';
import {
  MapContainer, TileLayer, Marker, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { useFormContext } from '../Form/Form';

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
  const {
    onChange, lat: latProp, lng: lngProp, name,
  } = props;
  const { handleInputChange, formData } = useFormContext();
  const lat = latProp || formData[name]?.lat;
  const lng = lngProp || formData[name]?.lng;

  const handleMarkerMove = ({ latlng }) => {
    if (typeof onChange === 'function') {
      onChange(latlng);
    }

    if (typeof handleInputChange === 'function') {
      handleInputChange({
        target: {
          name,
          value: latlng,
        },
      });
    }
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
  onChange() {},
};

export default LocationPicker;
