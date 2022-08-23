import Page from '../components/Page';
import { IndexMap } from '@/components/IndexMap'
import placeholderFeatures from '../public/json/index.json'
import { NextPage } from 'next';

const Index: NextPage = () => {
    return (
        <Page>
            <IndexMap
                data={placeholderFeatures}
            />
        </Page>
    );
};

export default Index;
