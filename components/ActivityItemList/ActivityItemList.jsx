import {
  LinearProgress, Table, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import classes from './ActivityItemList.module.css';
import useApi from '../../utils/useApi.ts';

const ActivityItemListSkeleton = () => (
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

const ActivityItemList = (props) => {
  const { projectId, activityId } = props;
  const activityItems = useApi(`/api/projects/${projectId}/activities/${activityId}/items`);
  const activityItemsData = activityItems.data ?? [];

  useEffect(() => {
    if (projectId && activityId) {
      activityItems.fetch();
    }
  }, [projectId, activityId]);

  if (activityItems.isLoading && !activityItemsData.length) {
    return <ActivityItemListSkeleton />;
  }

  return (
    <div className={classes.root}>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableBody>
          {(activityItemsData ?? []).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default observer(ActivityItemList);
