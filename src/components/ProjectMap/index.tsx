import React, { useEffect, forwardRef, useState, memo, useRef, useCallback, } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapboxGl, { GeoJSONLayer, ZoomControl } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import bbox from '@turf/bbox';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { NewFeatureDto } from '@/common/types';
import { useSWRConfig } from 'swr';

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

// @ts-ignore
export const DrawControlHOC = forwardRef(({ initialGeojson, onAction }, ref) => {
    useEffect(() => {
        // @ts-ignore
        if (!ref.current) { return; }
        // @ts-ignore
        ref.current.draw.add(initialGeojson);
    }, []);

    return (
        <DrawControl
            // @ts-ignore
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

const ProjectMap: React.FC<any> = ({ initialCoords = INITIAL_POSITION, initialGeojson, projectId }) => {
    const { mutate } = useSWRConfig()
    const MapGl = ReactMapboxGl({
        accessToken: 'pk.eyJ1Ijoia29wYWJsNCIsImEiOiJja2NkYjVxeDEwY3V2MzVwZzB3dXRndDVyIn0.av_Kw8ZtSe3fPnZttBf3MA',
    })

    const [viewport, setViewport] = useState({
        zoom: [INITIAL_ZOOM],
        center: initialCoords,
    })

    const ref = useRef(null)

    const onAction = useCallback(async props => {
        // const propsIds = props.features.map((x, i) => x.id)
        // const changedIds = geojsonList
        //     .filter((x, i) => propsIds.includes(x.id))
        //     .map((x, i) => x.id);

        switch (props.type) {
            case 'draw.create':
                await fetch(
                    `/api/admin/projects/${projectId}/features/create`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            coordinates: props.features[0].geometry.coordinates,
                        }),
                    }
                )
                    .then(async res => {
                        if (res.ok && res.status == 200) {
                            return await res.json()
                        } else {
                            throw Error(res.statusText)
                        }
                    })
                    .then((res: NewFeatureDto) => {
                        mutate(`/api/admin/projects/${projectId}/features`)
                    })
                    .catch(e => {
                        console.log('API error: ', e)
                    })
                break;

            // case 'draw.delete':
            //     setGeojsonList(
            //         geojsonList.filter((x, i) => !changedIds.includes(x.id))
            //     )
            //     break;

            default:
                break;
        }
    }, [])

    const [mapAction, setMapAction] = useState(null)
    useEffect(() => {
        if (!mapAction) { return }
        onAction(mapAction)
    }, [mapAction])

    return (
        <>
            <MapGl
                // @ts-ignore
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
                    // @ts-ignore
                    initialGeojson={initialGeojson}
                    onAction={onAction}
                />

            </MapGl>
        </>
    );
}

export default memo(ProjectMap);
