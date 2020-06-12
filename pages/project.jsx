import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Page from '../components/Page';

const ProjectPage = () => {
  const { query } = useRouter();

  return (
    <Page>
      <Typography variant="h4">
        Project
        {' '}
        {query.id}
      </Typography>
    </Page>
  );
};

export default ProjectPage;
