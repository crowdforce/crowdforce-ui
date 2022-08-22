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
    const { classes: s, cx } = useStyles();
    const { mutate } = useSWRConfig()

    const [geojsonList, setGeojsonList] = useState(
        data
    )

    const onAction = useCallback(props => {
        // const propsIds = props.features.map((x, i) => x.id)
        // const changedIds = geojsonList
        //     .filter((x, i) => propsIds.includes(x.id))
        //     .map((x, i) => x.id);


        switch (props.type) {
            case 'draw.create':
                fetch(
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
                        console.log('NEW POINT:', res)
                        mutate(`/api/admin/projects/${projectId}/features`)
                    })
                    .catch(e => {
                        console.log('API error: ', e)
                    })
                // setGeojsonList(
                //     props.features.map((x, i) => ({
                //         type: getType(x),
                //         id: x.id,
                //         name: `New feature`,
                //     }))
                //         .concat(geojsonList)
                // )
                break;

            // case 'draw.delete':
            //     setGeojsonList(
            //         geojsonList.filter((x, i) => !changedIds.includes(x.id))
            //     )
            //     break;

            default:
                break;
        }
    }, [geojsonList]);

    const [mapAction, setMapAction] = useState(null)
    useEffect(() => {
        if (!mapAction) { return }
        onAction(mapAction)
    }, [mapAction])


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
                            initialGeojson={dataToGeojson(geojsonList)}
                            onAction={setMapAction}
                        />
                    </div>
                </Stack>
                <Stack>
                    <ScrollArea>
                        <ProjectMapLegend
                            geojsonList={data}
                            setGeojsonList={setGeojsonList}
                        />
                    </ScrollArea>
                </Stack>
            </Group>
        </Card>
    )
}
