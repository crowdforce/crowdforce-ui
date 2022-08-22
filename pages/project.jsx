import { useEffect, useState, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { useRouter } from 'next/router';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import useApi from '../utils/useApi';
import ActivityEditor from '../components/ActivityEditor';
import ProjectMap from '../components/ProjectMap';
import ProjectMapLegend from '../components/ProjectMapLegend';
import geojsonFile from '../public/json/merged.json';
import { featureReduce, featureEach } from '@turf/meta';
import { getType } from '@turf/invariant';
import Button from '@mui/material/Button';

const ProjectPage = () => {
    const { query } = useRouter();
    const projectApi = useApi(`/api/projects/${query.projectId}`);
    const userApi = useApi('/api/auth/user');
    const [openActivityEditor, setOpenActivityEditor] = useState(false);

    const handleNewActivityClick = (e) => {
        e.preventDefault();
        setOpenActivityEditor(true);
    };

    const handleActivityEditorDialogClose = () => {
        setOpenActivityEditor(false);
    };

    useEffect(() => {
        if (query.projectId) {
            projectApi.fetch();
        }
    }, [projectApi, query.projectId, userApi.data?.name]);

    const [geojsonList, setGeojsonList] = useState(
        featureReduce(
            geojsonFile,
            (acc, x, i) => (acc.concat([
                {
                    type: getType(x),
                    name: x.properties?.name ?? `${getType(x)} ${i + 1}`,
                    id: x.id,
                },
            ])),
            []
        )
    );

    const onAction = useCallback(props => {
        const propsIds = props.features.map((x, i) => x.id)
        const changedIds = geojsonList
            .filter((x, i) => propsIds.includes(x.id))
            .map((x, i) => x.id);

        switch (props.type) {
            case 'draw.create':
                setGeojsonList(
                    props.features.map((x, i) => ({
                        type: getType(x),
                        id: x.id,
                        name: `New feature`,
                    }))
                        .concat(geojsonList)
                )
                break;

            case 'draw.delete':
                setGeojsonList(
                    geojsonList.filter((x, i) => !changedIds.includes(x.id))
                )
                break;

            default:
                break;
        }
    }, [geojsonList]);

    const [mapAction, setMapAction] = useState(null)
    useEffect(() => {
        if (!mapAction) { return }
        onAction(mapAction)
    }, [mapAction])

    const drawRef = useRef(null);

    const onSave = useCallback(() => {
        let newGeojson = drawRef.current.draw.getAll()
        featureEach(newGeojson, (x, i) => {
            const name = geojsonList.find((item) => item.id == x.id).name
            x.properties.name = name
        })

        console.log(newGeojson)
    }, [geojsonList])

    return (
        <Page>
            <Stack
                direction={{ sm: 'column', md: 'row' }}
                spacing={2}
                alignItems='flex-start'
                sx={{
                    height: '100%',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '450px',
                        height: '100%',
                        flex: '1 0 100%',
                    }}
                >
                    <ProjectCard projectId={query.projectId} />
                </div>

                <div
                    style={{
                        position: 'relative',
                        flex: '1 1 auto',
                    }}
                >
                    <Card
                        sx={{
                            height: '100%',
                            maxHeight: 'calc(100vh - 81px - 20px * 2 - 20px * 4)',
                        }}
                    >
                        <Stack
                            direction={{ sm: 'column', md: 'row' }}
                            spacing={2}
                            sx={{
                                maxHeight: 'calc(100vh - 81px - 20px * 2 - 20px * 4)',
                            }}
                        >
                            <div
                                style={{
                                    flex: '1 0 75%',
                                }}
                            >
                                <ProjectMap
                                    initialGeojson={geojsonFile}
                                    onAction={setMapAction}
                                    ref={drawRef}
                                />
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    minWidth: 200,
                                }}
                            >
                                <Stack
                                    direction='column'
                                    spacing={2}
                                    sx={{
                                        height: ' 100%',
                                    }}
                                >
                                    <ProjectMapLegend
                                        geojsonList={geojsonList}
                                        setGeojsonList={setGeojsonList}
                                    />
                                    <Button
                                        onClick={onSave}
                                    >
                                        Сохранить
                                    </Button>
                                </Stack>
                            </div>
                        </Stack>
                    </Card>
                </div>
            </Stack>
            <ActivityEditor
                projectId={query.projectId}
                open={openActivityEditor}
                onClose={handleActivityEditorDialogClose}
            />
        </Page>
    );
};

export default observer(ProjectPage);
