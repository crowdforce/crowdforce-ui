import {
  LinearProgress, Typography, Table, TableRow, TableCell, TableBody, IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import classes from './AcivityList.module.css';
import useApi from '../../utils/useApi';
import formatDate from '../../utils/formatDate';
import ActivityEditor from '../ActivityEditor';
import ajax from '../../utils/ajax';

const AcivityListSkeleton = () => (
  <Table style={{ tableLayout: 'fixed' }}>
    <TableBody>
      <TableRow>
        <TableCell>
          <Skeleton />
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Skeleton />
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Skeleton />
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Skeleton />
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const AcivityList = (props) => {
  const router = useRouter();
  const { projectId } = props;
  const activitiesApi = useApi(`/api/projects/${projectId}/activities`);
  const projectApi = useApi(`/api/projects/${projectId}`);
  const userApi = useApi('/api/auth/user');
  const isLoadingActivities = activitiesApi.isLoading ?? true;
  const activitiesData = activitiesApi.data ?? [];
  const [editActivityId, setEditActivityId] = useState(null);

  useEffect(() => {
    if (projectId) {
      activitiesApi.fetch();
    }
  }, [projectId]);

  if (isLoadingActivities && !activitiesData.length) {
    return <AcivityListSkeleton />;
  }

  const handleActivityEditorDialogClose = () => {
    setEditActivityId(null);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditActivityId(e.currentTarget.dataset.activityId);
  };

  const handleSubscribeClick = (e) => {
    e.stopPropagation();
    ajax.put(`/api/projects/${projectId}/activities/${e.currentTarget.dataset.activityId}/participants`).then(() => {
      activitiesApi.fetch();
    });
  };

  const handleUnSubscribeClick = (e) => {
    e.stopPropagation();
    ajax.delete(`/api/projects/${projectId}/activities/${e.currentTarget.dataset.activityId}/participants`).then(() => {
      activitiesApi.fetch();
    });
  };

  return (
    <div className={classes.root}>
      {isLoadingActivities && <LinearProgress style={{ marginBottom: '-4px', zIndex: 1 }} />}
      {activitiesData.length ? (
        <Table style={{ tableLayout: 'fixed' }}>
          <TableBody>
            {(activitiesData ?? []).map((acitivity) => (
              <TableRow onClick={() => router.push(`/activity?projectId=${projectId}&activityId=${acitivity.id}`)} key={acitivity.id} hover style={{ cursor: 'pointer' }}>
                <TableCell style={{ verticalAlign: 'top' }}>
                  <Typography>
                    <a href={`/activity?projectId=${projectId}&activityId=${acitivity.id}`}>
                      {acitivity.name}
                    </a>
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDate(acitivity.startDate)}
                    {acitivity.endDate && ` - ${formatDate(acitivity.endDate)}`}
                  </Typography>
                </TableCell>
                <TableCell>{acitivity.description}</TableCell>
                <TableCell style={{ width: '100px', whiteSpace: 'nowrap' }}>
                  {projectApi.data?.privilege === 'OWNER' && (
                  <IconButton data-activity-id={acitivity.id} onClick={handleEditClick} size="large">
                    <EditIcon />
                  </IconButton>
                  )}
                  {acitivity.participate && userApi.data && (
                  <IconButton
                    data-activity-id={acitivity.id}
                    onClick={handleUnSubscribeClick}
                    size="large">
                    <NotificationsOffIcon />
                  </IconButton>
                  )}
                  {!acitivity.participate && userApi.data && (
                  <IconButton
                    data-activity-id={acitivity.id}
                    onClick={handleSubscribeClick}
                    size="large">
                    <AddAlertIcon />
                  </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>В этом проекте еще нет ни одной активности</Typography>
      )}
      <ActivityEditor
        projectId={projectId}
        activityId={editActivityId}
        open={editActivityId !== null}
        onClose={handleActivityEditorDialogClose}
      />
    </div>
  );
};

export default observer(AcivityList);
