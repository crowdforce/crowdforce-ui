import 'mapbox-gl/dist/mapbox-gl.css'

import { memo } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { ProjectDraw } from './ProjectDraw'
import { dataToGeojson } from './lib'
import { AdminFeatureDto } from '@/common/types'

const MapGl = dynamic(
    () => import('react-map-gl'),
    { ssr: false },
);

export type ProjectMapProps = {
    projectId: string
}

const ProjectMap: React.FC<ProjectMapProps> = ({ projectId }) => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    const { data, error } = useSWR<AdminFeatureDto[]>(`/api/admin/projects/${projectId}/features`)

    return (
        <MapGl
            id="map"
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
            mapboxAccessToken={token}
            initialViewState={{
                latitude: 59.94670423319895,
                longitude: 30.371801220550694,
                zoom: 14,
            }}
        // fitBounds={bbox(initialGeojson)}
        // fitBoundsOptions={{
        //     padding: 20,
        //     linear: true,
        // }}
        >
            {/* <ZoomControl /> */}
            <ProjectDraw
                initialValue={dataToGeojson(data ?? [])}
                projectId={projectId}
            />
        </MapGl>
    );
}

export default memo(ProjectMap);
