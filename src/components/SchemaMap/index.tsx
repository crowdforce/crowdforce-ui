import 'mapbox-gl/dist/mapbox-gl.css'

import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { MapViewportDto } from '@/common/types'
import { GeolocateControl, Layer, NavigationControl } from 'react-map-gl'
import { SchemaSource } from './SchemaSource'
import { Button } from '@mantine/core'

const MapGl = dynamic(
    () => import('react-map-gl'),
    { ssr: false },
);

export type SchemaMapProps = {
    id: string
    projectId: string
}

const mapStyles = {
    satellite: 'mapbox://styles/mapbox/satellite-streets-v11',
    vector: 'mapbox://styles/mapbox/streets-v11',
}

export const SchemaMap: React.FC<SchemaMapProps> = ({ id, projectId }) => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    const { data: viewport } = useSWR<MapViewportDto>(`/api/projects/${projectId}/viewport`)
    const [mapStyle, setMapStyle] = useState(mapStyles.satellite)
    if (!viewport) {
        return null
    }

    return (
        <MapGl
            id={id}
            style={{ width: '100%', height: '100%' }}
            mapStyle={mapStyle}
            mapboxAccessToken={token}
            initialViewState={{
                longitude: viewport?.lng,
                latitude: viewport?.lat,
                zoom: viewport?.zoom,
            }}
        >
            <NavigationControl
                showCompass={false}
                style={{
                    borderRadius: '16px',
                }}
            />
            <GeolocateControl
                style={{
                    borderRadius: '16px',
                }}
            />

            <Button.Group
                sx={{
                    position: 'absolute',
                    zIndex: 2,
                    bottom: 16,
                    right: 16,
                }}
            >
                <Button
                    size='xs'
                    color='gray'
                    variant='filled'
                    onClick={() => setMapStyle(mapStyles.satellite)}
                    sx={theme => ({
                        background: 'white',
                        color: mapStyle === mapStyles.satellite ? theme.colors.lime : theme.colors.gray,
                        ':hover': {
                            background: 'white',
                        }
                    })}
                >
                    Спутник
                </Button>
                <Button
                    size='xs'
                    color='gray'
                    variant='filled'
                    onClick={() => setMapStyle(mapStyles.vector)}
                    sx={theme => ({
                        background: 'white',
                        color: mapStyle === mapStyles.vector ? theme.colors.lime : theme.colors.gray,
                        ':hover': {
                            background: 'white',
                        }
                    })}
                >
                    Вектор
                </Button>
            </Button.Group>

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
