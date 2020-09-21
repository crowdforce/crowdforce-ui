import { useRef, useState } from 'react';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const INITIAL_ZOOM = 11;
const projectPinIcon = new L.Icon({
  iconUrl: '/project-pin.png',
  iconAnchor: [17, 41],
  iconSize: [34, 49],
});

const LocationPicker = (props) => {
  const { onChange, lat, lng } = props;
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const handleMarkerMove = ({ latlng }) => {
    onChange(latlng);
  };

  return (
    <div>
      <LeafletMap
        center={[lat, lng]}
        zoom={zoom}
        ref={mapRef}
        onclick={handleMarkerMove}
        onzoom={({ target }) => setZoom(target.zoom)}
        style={{
          height: '600px',
          transform: 'translate3D(0,0,0)',
        }}
      >
        <TileLayer
          attribution="©OpenStreetMap, ©CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Marker
          draggable
          position={[lat, lng]}
          icon={projectPinIcon}
          onclick={() => false}
          onmouseup={handleMarkerMove}
        />
      </LeafletMap>
    </div>
  );
};

LocationPicker.defaultProps = {
  lat: 59.937500,
  lng: 30.308611,
  onChange() {},
};

export default LocationPicker;
