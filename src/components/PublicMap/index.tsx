import 'mapbox-gl/dist/mapbox-gl.css'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { NavigationControl, Marker } from 'react-map-gl'
import { ProjectPopup } from './ProjectPopup'
import { PublicProjectDto } from '@/common/types'
import { ImageMarker } from '../ImageMarker'

const MapGl = dynamic(
    () => import('react-map-gl'),
    { ssr: false },
);

const defaultImageUrl = '/project-pin.png'

export type PublicMapProps = {
    data?: PublicProjectDto[]
    initialViewState: {
        latitude: number
        longitude: number
        zoom: number
    }
}

export const PublicMap: React.FC<PublicMapProps> = ({ data, ...props }) => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    const [currentProject, setCurrentProject] = useState<PublicProjectDto>();

    return (
        <MapGl
            id="map"
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
            mapboxAccessToken={token}
            initialViewState={props.initialViewState}
            onClick={() => {
                setCurrentProject(undefined)
            }}
        >
            <NavigationControl
                showZoom
                position="top-right"
                showCompass={false}
                visualizePitch={false}
            />

            {!data ? null : data.map(item => (
                <Marker
                    key={item.id}
                    longitude={item.lng}
                    latitude={item.lat}
                    anchor='center'
                    onClick={(event) => {
                        event.originalEvent.stopPropagation()
                        setCurrentProject(item)
                    }}
                >
                    <ImageMarker
                        size={48}
                        src={item.imageUrl ?? defaultImageUrl}
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                </Marker>
            ))}

            {!currentProject ? null : (
                <ProjectPopup
                    lng={currentProject.lng}
                    lat={currentProject.lat}
                    title={currentProject.title}
                    caption={currentProject.description}
                    src={currentProject.imageUrl}
                    href={`/project/${currentProject.id}`}
                />
            )}
        </MapGl>
    )
}
