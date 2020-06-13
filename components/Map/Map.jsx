import React, { useEffect, useRef } from 'react';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const INITIAL_POSITION = {
  lat: 55.167681,
  lng: 61.391041,
};
const INITIAL_ZOOM = 13;

const projectPinIcon = new L.Icon({
  iconUrl: '/project-pin.png',
  iconAnchor: [17, 41],
  iconSize: [34, 49],
});

const activityPinIcon = new L.Icon({
  iconUrl: '/activity-pin.png',
  iconAnchor: [12, 34],
  iconSize: [24, 34],
});

const Map = ({
  projects = [],
  activities = [],
  onViewportChange,
  onProjectClick,
  onActivityClick
}) => {
  const mapRef = useRef(null);
  const handleViewportChange = () => {
    const bounds = mapRef.current.leafletElement.getBounds();
    onViewportChange(bounds);
  };
  useEffect(handleViewportChange, []);
  return (
    <div className="map-root">
      <LeafletMap
        center={[INITIAL_POSITION.lat, INITIAL_POSITION.lng]}
        zoom={INITIAL_ZOOM}
        ref={mapRef}
        onViewportChanged={handleViewportChange}
        style={{
          height: '600px',
          transform: 'translate3D(0,0,0)',
        }}
      >
        <TileLayer
          attribution="©OpenStreetMap, ©CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        {projects.map(project => (
          <Marker
            key={project.id}
            position={[project.lat, project.lng]}
            icon={projectPinIcon}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
        {activities.map(activity => (
          <Marker
            key={activity.id}
            position={[activity.lat, activity.lng]}
            icon={activityPinIcon}
            onClick={() => onActivityClick(activity.id)}
          />
        ))}
      </LeafletMap>
    </div>
  );
};

export default Map;
