import Page from '../components/Page';
import { PublicMap } from '@/components/PublicMap'
import { NextPage } from 'next'
import useSWR from 'swr'
import { PublicProjectDto } from '@/common/types';

const Index: NextPage = () => {
    const { data, error } = useSWR<PublicProjectDto[]>(`/api/projects`)

    return (
        <Page>
            <PublicMap
                data={data}
                initialViewState={{
                    latitude: 59.94670423319895,
                    longitude: 30.371801220550694,
                    zoom: 10,
                }}
            />
        </Page>
    );
};

export default Index;
