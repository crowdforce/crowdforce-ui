import React, { useCallback, useState } from 'react';
import { NavigationControl, Source, Layer, Popup, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';
import { featureCollection } from '@turf/helpers'
import pinIcon from '../../public/activity-pin.png'
import Image from 'next/image'
import IndexMapPopup from './IndexMapPopup'

const MapGl = dynamic(
    () => import('react-map-gl'),
    { ssr: false },
);
const INITIAL_POSITION = {
    longitude: 98.308611,
    latitude: 62.937500,
};
const INITIAL_ZOOM = 2.75;

const layerStyle = {
    id: 'data-feature',
    type: 'circle',
    paint: {
        'circle-radius': 3,
        'circle-color': '#4E3FC8',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#000000',
    },
};

const IndexMap = ({ data, initialCoords }) => {
    const [state, setState] = useState([]);
    const onClick = useCallback(
        (e, id) => {
            e.originalEvent.stopPropagation();
            // while features are from placeholder: id = index = i  
            setState(
                state.includes(id)
                    ? state.filter((x, i) => i === id)
                    : state.concat(id)
            )
        },
        [state],
    );

    return (
        <MapGl
            id="map"
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxAccessToken={'pk.eyJ1Ijoia29wYWJsNCIsImEiOiJja2NkYjVxeDEwY3V2MzVwZzB3dXRndDVyIn0.av_Kw8ZtSe3fPnZttBf3MA'}
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

            {/* {Boolean(data) && (
                <Source
                    id='data-src'
                    type='geojson'
                    data={
                        featureCollection(data)
                    }
                >
                    <Layer
                        {...layerStyle}
                    />
                </Source>
            )} */}

            {Boolean(data) && data.map((x, i) => (
                <Marker
                    key={i}
                    longitude={x.geometry.coordinates[0]}
                    latitude={x.geometry.coordinates[1]}
                    anchor='bottom'
                    onClick={e => onClick(e, i)}
                >
                    <div style={{
                        cursor: 'pointer',
                    }}>
                        <Image
                            src={pinIcon}
                        />
                    </div>
                </Marker>
            ))}

            {state.map((x, i) => (
                <IndexMapPopup
                    key={x}
                    feature={data[x]}
                />
            ))}
        </MapGl >
    );
};

export default IndexMap;
