import 'mapbox-gl/dist/mapbox-gl.css'

import { memo } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { MapViewportDto } from '@/common/types'
import { Layer } from 'react-map-gl'
import { SchemaSource } from './SchemaSource'

const MapGl = dynamic(
    () => import('react-map-gl'),
    { ssr: false },
);

export type SchemaMapProps = {
    id: string
    projectId: string
}

export const SchemaMap: React.FC<SchemaMapProps> = ({ id, projectId }) => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    const { data: viewport } = useSWR<MapViewportDto>(`/api/projects/${projectId}/viewport`)
    if (!viewport) {
        return null
    }

    return (
        <MapGl
            id={id}
            style={{ width: '100%', height: '100%' }}
            mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
            mapboxAccessToken={token}
            initialViewState={{
                longitude: viewport?.lng,
                latitude: viewport?.lat,
                zoom: viewport?.zoom,
            }}
        >
            <SchemaSource
                id={`trees`}
                projectId={projectId}
                type={'Point'}
            >
                <Layer
                    id={`trees`}
                    type='circle'
                    paint={{
                        'circle-radius': 10,
                        'circle-color': '#0f0'
                    }}
                />
            </SchemaSource>
            <SchemaSource
                id={`border`}
                projectId={projectId}
                type={'Polygon'}
            >
                <Layer
                    id={`border`}
                    type='line'
                    paint={{
                        'line-color': '#ff0000',
                        'line-width': 2,
                    }}
                    layout={{
                        'line-join': 'round',
                        'line-cap': 'round'
                    }}
                />
            </SchemaSource>
        </MapGl>
    )
}

export default memo(SchemaMap)
