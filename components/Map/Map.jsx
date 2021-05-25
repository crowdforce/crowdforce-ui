import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { LinearProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import classes from './Map.module.css';
import ProjectCard from '../ProjectCard';
import useApi from '../../utils/useApi';

const INITIAL_POSITION = {
  lat: 59.937500,
  lng: 30.308611,
};
const INITIAL_ZOOM = 11;

const projectPinIcon = new L.Icon({
  iconUrl: '/project-pin.png',
  iconAnchor: [17, 41],
  iconSize: [34, 49],
});

const Map = () => {
  const projects = useApi('/api/projects');
  const [activeProjectId, setActiveProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setActiveProjectId(projectId);
  };

  useEffect(() => {
    projects.fetch();
  }, []);

  return (
    <div className={classes.root}>
      {projects.isLoading && <LinearProgress style={{ marginBottom: '-4px', zIndex: 1 }} />}
      <MapContainer
        center={[INITIAL_POSITION.lat, INITIAL_POSITION.lng]}
        zoom={INITIAL_ZOOM}
        style={{
          height: '600px',
          transform: 'translate3D(0,0,0)',
        }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="©OpenStreetMap, ©CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        {(projects.data ?? []).map((project) => (
          <Marker
            key={project.id}
            position={[project.lat, project.lng]}
            icon={projectPinIcon}
            data-project-id={project.id}
            eventHandlers={{
              click: () => handleProjectClick(project.id),
            }}
          />
        ))}
      </MapContainer>
      {activeProjectId && <ProjectCard projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />}
    </div>
  );
};

export default observer(Map);
