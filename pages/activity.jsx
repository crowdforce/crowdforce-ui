import { useRouter } from 'next/router';
import { Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import ActivityItemList from '../components/ActivityItemList';
import useApi from '../utils/useApi.ts';
import formatDate from '../utils/formatDate';

const ActivityPage = () => {
  const { query } = useRouter();
  const activityApi = useApi(`/api/projects/${query.projectId}/activities/${query.activityId}`);
  const activityData = activityApi.data ?? {};
  const projectApi = useApi(`/api/projects/${query.projectId}`);

  useEffect(() => {
    if (query.projectId && query.activityId) {
      activityApi.fetch();
    }
  }, [query.projectId, query.activityId]);

  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{
          position: 'relative', width: '450px', marginRight: '40px', flexShrink: 0,
        }}
        >
          <ProjectCard projectId={query.projectId} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ padding: '44px 0' }}>
            {activityData.name ? (
              <>
                <Typography variant="h5">{activityData.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {formatDate(activityData.startDate)}
                  {activityData.endDate && ` - ${formatDate(activityData.endDate)}`}
                </Typography>
                <Typography style={{ paddingTop: '20px' }}>{activityData.description}</Typography>
              </>
            ) : (
              <>
                <Skeleton width={200} />
                <div style={{ paddingTop: '20px' }}>
                  <Skeleton width={600} />
                </div>
              </>
            )}
          </div>
          <ActivityItemList projectId={query.projectId} activityId={query.activityId} />
          {projectApi.data?.privilege === 'OWNER' && (
            <div style={{ padding: '20px 0' }}>
              <Button variant="contained" color="primary">Добавить задачу</Button>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default observer(ActivityPage);
