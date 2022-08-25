import useSWR from 'swr'
import { Source } from 'react-map-gl'

export type SchemaSourceProps = {
    id: string
    projectId: string
    type: 'Point' | 'Polygon'
    children?: React.ReactNode
}

export const SchemaSource: React.FC<SchemaSourceProps> = ({ id, projectId, type, children }) => {
    const { data } = useSWR<GeoJSON.FeatureCollection>(`/api/projects/${projectId}/features?type=${type}`)
    if (!data) {
        return null
    }

    return (
        <Source
            id={id}
            data={data}
            type="geojson"
        >
            {children}
        </Source>
    )
}
