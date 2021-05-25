import {
  LinearProgress, Typography, Table, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import classes from './AcivityList.module.css';
import useApi from '../../utils/useApi.ts';
import formatDate from '../../utils/formatDate';

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
  const activities = useApi(`/api/projects/${projectId}/activities`);
  const activitiesData = activities.data ?? [];

  useEffect(() => {
    if (projectId) {
      activities.fetch();
    }
  }, [projectId]);

  if (activities.isLoading && !activitiesData.length) {
    return <AcivityListSkeleton />;
  }

  return (
    <div className={classes.root}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default observer(AcivityList);
