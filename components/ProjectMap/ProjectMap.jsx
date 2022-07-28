import React, { useCallback, useEffect } from 'react';
import {
  NavigationControl, useMap, Source, Layer,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';
import bbox from '@turf/bbox';
import { getType } from '@turf/invariant';
import { featureReduce } from '@turf/meta';
import { featureCollection } from '@turf/helpers';

const MapGl = dynamic(
  () => import('react-map-gl'),
  { ssr: false },
);
const INITIAL_POSITION = {
  longitude: 30.308611,
  latitude: 59.937500,
};
const INITIAL_ZOOM = 11;

const layers = {
  Point: {
    id: 'data-point',
    type: 'circle',
    paint: {
      'circle-radius': 3,
      'circle-color': '#4E3FC8',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#000000',
    },
  },
  Polygon: {
    id: 'data-polygon',
    type: 'fill',
    paint: {
      'fill-color': '#4E3FC8',
      'fill-opacity': 0.25,
      'fill-outline-color': '#000000',
    },
  },
};

const ProjectMapLegend = ({ data, initialCoords }) => {
  const onClick = useCallback((event) => {
    const { lngLat } = event;
  },
  []);

  const dataFeatureTypes = featureReduce(data, (acc, x, i) => (acc.includes(getType(x)) ? acc : acc.concat(getType(x))), []);

  const { map } = useMap();
  useEffect(() => {
    if (!map) { return; }
    map.fitBounds(
      bbox(data),
      {
        padding: 20,
        linear: true,
      },
    );
  }, [map, data]);

  return (
    <MapGl
      id="map"
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken="pk.eyJ1Ijoia29wYWJsNCIsImEiOiJja2NkYjVxeDEwY3V2MzVwZzB3dXRndDVyIn0.av_Kw8ZtSe3fPnZttBf3MA"
      onClick={onClick}
      initialViewState={{
        ...initialCoords ?? INITIAL_POSITION,
        zoom: INITIAL_ZOOM,
      }}
    >
      <NavigationControl
        showZoom
        position="top-right"
        showCompass={false}
        visualizePitch={false}
      />

      {Boolean(data) && (
        dataFeatureTypes.map((x, i) => (
          <Source
            key={i}
            id={`data-${x}`}
            type="geojson"
            data={featureCollection(
              featureReduce(data, (acc, j) => (getType(j) === x ? acc.concat(j) : acc), []),
            )}
          >
            <Layer
              {...layers[x]}
            />
          </Source>
        ))
      )}

    </MapGl>
  );
};

export default ProjectMapLegend;
