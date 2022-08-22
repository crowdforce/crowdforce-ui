import React, { useEffect, forwardRef, useState, memo, useRef, } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapboxGl, { GeoJSONLayer, ZoomControl } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import bbox from '@turf/bbox';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const INITIAL_POSITION = [
    30.308611,
    59.937500,
];
const INITIAL_ZOOM = 11;

const layers = {
    Point: {
        circlePaint: {
            'circle-radius': 3,
            'circle-color': '#4E3FC8',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000',
        },
    },
    Polygon: {
        fillPaint: {
            'fill-color': '#4E3FC8',
            'fill-opacity': 0.25,
            'fill-outline-color': '#000000',
        },
    },
};

export const DrawControlHOC = forwardRef(({ initialGeojson, onAction }, ref) => {
    useEffect(() => {
        if (!ref.current) { return; }
        ref.current.draw.add(initialGeojson);
    }, []);

    return (
        <DrawControl
            ref={ref}
            controls={{
                line_string: false,
                combine_features: false,
                uncombine_features: false,
                trash: false,
                polygon: false,
            }}
            onDrawCreate={(props) => onAction(props)}
            onDrawDelete={(props) => onAction(props)}
        />
    );
});

const ProjectMap: React.ForwardRefExoticComponent<any> = ({ initialCoords = INITIAL_POSITION, initialGeojson, onAction }) => {
    const MapGl = ReactMapboxGl({
        accessToken: 'pk.eyJ1Ijoia29wYWJsNCIsImEiOiJja2NkYjVxeDEwY3V2MzVwZzB3dXRndDVyIn0.av_Kw8ZtSe3fPnZttBf3MA',
    });

    const [viewport, setViewport] = useState({
        zoom: [INITIAL_ZOOM],
        center: initialCoords,
    });

    //   const dataFeatureTypes = featureReduce(data, (acc, x, i) => (acc.includes(getType(x)) ? acc : acc.concat(getType(x))), []);

    const ref = useRef(null)
    return (
        <>
            <MapGl
                id="map"
                containerStyle={{ position: 'absolute', width: '100%', height: '100%' }}
                style="mapbox://styles/mapbox/light-v10"
                {...viewport}
                // dosent work if data is []
                // fitBounds={bbox(initialGeojson)} 
                fitBoundsOptions={{
                    padding: 20,
                    linear: true,
                }}
            >
                <ZoomControl />

                <DrawControlHOC
                    ref={ref}
                    initialGeojson={initialGeojson}
                    onAction={onAction}
                />

            </MapGl>
        </>
    );
}

export default memo(ProjectMap);
