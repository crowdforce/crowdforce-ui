import { Button, Tab } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { GetStaticProps, GetStaticPaths } from 'next'
import Page from 'components/Page/Page';
import geojson from '../../../public/json/merged.json';

const ProjectPage = () => {
    const { query } = useRouter()
    const [openActivityEditor, setOpenActivityEditor] = useState(false);

    const handleNewActivityClick = (e) => {
        e.preventDefault();
        setOpenActivityEditor(true);
    };

    const handleActivityEditorDialogClose = () => {
        setOpenActivityEditor(false);
    };

    const [activeTab, setActiveTab] = useState('activities')

    return (
        <Page>
            <Stack
                direction={{ sm: 'column', md: 'row' }}
                spacing={2}
                sx={{
                    height: '100%',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '450px',
                        flex: '1 0 100%',
                    }}
                >
                    <ProjectCard projectId={query.projectId} />
                </div>
                <Stack
                    direction="column"
                    sx={{ flexGrow: 1 }}
                >
                    <TabContext value={activeTab}>
                        <TabList onChange={(e, value) => setActiveTab(value)}>
                            <Tab label="Активности" value="activities" />
                            <Tab label="Карта" value="map" />
                        </TabList>

                        <TabPanel value="activities">
                            <EventList
                                projectId={query.projectId}
                                activityId={null}
                                activityItemId={null}
                            />
                            {projectApi.data?.privilege === 'OWNER' && (
                                <div style={{ padding: '20px 0' }}>
                                    <Button onClick={handleNewActivityClick} variant="contained" color="primary">Добавить активность</Button>
                                </div>
                            )}
                        </TabPanel>

                        <TabPanel
                            value="map"
                            sx={{
                                flex: '1 1 auto',
                            }}
                        >
                            <Stack
                                direction={{ sm: 'column', md: 'row' }}
                                spacing={2}
                                sx={{
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        flex: '1 0 75%',
                                    }}
                                >
                                    <ProjectMap
                                        data={geojson}
                                    />
                                </div>
                                <Card
                                    sx={{
                                        width: '100%',
                                        minWidth: 200,
                                    }}
                                >
                                    <CardContent>
                                        <ProjectMapLegend
                                            data={geojson}
                                        />
                                    </CardContent>
                                </Card>
                            </Stack>
                        </TabPanel>
                    </TabContext>
                </Stack>
            </Stack>
            <ActivityEditor
                projectId={query.projectId}
                open={openActivityEditor}
                onClose={handleActivityEditorDialogClose}
            />
        </Page>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {}, s
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

}