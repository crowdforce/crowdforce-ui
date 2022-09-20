import "mapbox-gl/dist/mapbox-gl.css"

import { memo, useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import useSWR from "swr"
import { MapViewportDto } from "@/common/types"
import { GeolocateControl, Layer, NavigationControl, useMap } from "react-map-gl"
import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { MapStyleSelector } from "./MapStyleSelector"
import { SchemaSource } from "./SchemaSource"

const MapGl = dynamic(
    () => import("react-map-gl"),
    { ssr: false },
)

export type SchemaMapProps = {
    id: string
    projectId: string
}

const mapStyles = {
    satellite: {
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        title: "Спутник",
    },
    vector: {
        style: "mapbox://styles/mapbox/streets-v11",
        title: "Вектор",
    },
}

export const SchemaMap: React.FC<SchemaMapProps> = ({ id, projectId }) => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    const { data: viewport } = useSWR<MapViewportDto>(`/api/projects/${projectId}/viewport`)
    const [mapStyle, setMapStyle] = useState(mapStyles.satellite.style)
    const { wide } = useContext(ProjectSideMenuContext)
    const { [id]: map } = useMap()
    useEffect(() => {
        if (map) {
            map.resize()
        }
    }, [map, wide])

    if (!viewport) {
        return null
    }

    return (
        <MapGl
            id={id}
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
                    borderRadius: "16px",
                }}
            />
            <GeolocateControl
                style={{
                    borderRadius: "16px",
                }}
            />

            <MapStyleSelector
                {...{ mapStyle, setMapStyle, mapStyles }}
            />

            <SchemaSource
                id={"trees"}
                projectId={projectId}
                type={"Point"}
            >
                <Layer
                    id={"trees"}
                    type='circle'
                    paint={{
                        "circle-radius": 10,
                        "circle-color": "#0f0",
                    }}
                />
            </SchemaSource>
            <SchemaSource
                id={"border"}
                projectId={projectId}
                type={"Polygon"}
            >
                <Layer
                    id={"border"}
                    type='line'
                    paint={{
                        "line-color": "#ff0000",
                        "line-width": 2,
                    }}
                    layout={{
                        "line-join": "round",
                        "line-cap": "round",
                    }}
                />
            </SchemaSource>
        </MapGl>
    )
}

export default memo(SchemaMap)
