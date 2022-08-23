import { createStyles, Textarea, TextInput, Button, Stack, Tooltip, Card, Group, ScrollArea, Container, Loader } from '@mantine/core'
import { AdminProjectDto, NewFeatureDto, NewProjectDto } from '@/common/types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { featureReduce, featureEach } from '@turf/meta'
import { getType } from '@turf/invariant'
import ProjectMap from '@/components/ProjectMap'
import ProjectMapLegend from '@/components/ProjectMapLegend'
import useSWR, { useSWRConfig } from 'swr'
import { featureCollection } from '@turf/helpers'

const useStyles = createStyles((theme) => ({
    card: {
        maxHeight: '100vh',
    }
}))

const dataToGeojson = (data: any) => featureCollection(
    // @ts-ignore
    data.map((x, i) => ({
        ...x,
        'type': 'Feature',
        geometry: {
            coordinates: x.coordinates,
            'type': 'Point',
        }
    }))
)

export const ProjectMapEditor: React.FC<any> = ({ data, projectId }) => {
    const { classes: s, cx } = useStyles()

    const [geojsonState, setGeojsonState] = useState(
        data
    )


    if (!data) {
        return (
            <Card
                withBorder
                className={s.card}
            >
                <Loader />
            </Card>
        )
    }

    return (
        <Card
            withBorder
            className={s.card}
        >
            <Group
                grow
                align='flex-start'
            >
                <Stack>
                    <div style={{
                        position: 'relative',
                        minHeight: 'min(100vh, 400px)',
                    }}>
                        <ProjectMap
                            initialGeojson={dataToGeojson(geojsonState)}
                            projectId={projectId}
                        />
                    </div>
                </Stack>
                <Stack>
                    <ScrollArea>
                        <ProjectMapLegend
                            geojsonList={data}
                            setGeojsonList={setGeojsonState}
                        />
                    </ScrollArea>
                </Stack>
            </Group>
        </Card>
    )
}
