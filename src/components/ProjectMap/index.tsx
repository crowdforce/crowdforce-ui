import 'mapbox-gl/dist/mapbox-gl.css'

import { memo } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { ProjectDraw } from './ProjectDraw'
import { dataToGeojson } from './lib'
import { AdminFeatureDto, AdminProjectDto } from '@/common/types'

const MapGl = dynamic(
    () => import('react-map-gl'),
    { ssr: false },
);

export type ProjectMapProps = {
    id: string
    projectId: string
}

const ProjectMap: React.FC<ProjectMapProps> = ({ id, projectId }) => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
    const { data: project } = useSWR<AdminProjectDto>(`/api/admin/projects/${projectId}`)
    const { data: features } = useSWR<AdminFeatureDto[]>(`/api/admin/projects/${projectId}/features`)

    return (
        <MapGl
            id={id}
            style={{ width: '100%', height: '100%' }}
            mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
            mapboxAccessToken={token}
            initialViewState={{
                longitude: project?.viewport.lng,
                latitude: project?.viewport.lat,
                zoom: project?.viewport.zoom,
            }}
        // fitBounds={bbox(initialGeojson)}
        // fitBoundsOptions={{
        //     padding: 20,
        //     linear: true,
        // }}
        >
            {/* <ZoomControl /> */}
            <ProjectDraw
                initialValue={dataToGeojson(features ?? [])}
                projectId={projectId}
            />
        </MapGl>
    );
}

export default memo(ProjectMap);
