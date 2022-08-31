import Page from '@/components/Page';
import { PublicMap } from '@/components/PublicMap'
import { NextPage } from 'next'
import useSWR from 'swr'
import { PublicProjectDto } from '@/common/types';
import { Box } from '@mantine/core';

const Index: NextPage = () => {
    const { data, error } = useSWR<PublicProjectDto[]>(`/api/projects`)

    return (
        <Page>
            <Box sx={{
                height: 600,
            }}>
                <PublicMap
                    data={data}
                    initialViewState={{
                        latitude: 59.94670423319895,
                        longitude: 30.371801220550694,
                        zoom: 10,
                    }}
                />
            </Box>
        </Page>
    );
};

export default Index;
