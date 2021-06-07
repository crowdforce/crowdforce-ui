import {
  TableRow, TableCell,
} from '@material-ui/core';
import { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import useApi from '../../utils/useApi.ts';

const ActivityItemListSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton />
    </TableCell>
    <TableCell>
      <Skeleton />
    </TableCell>
  </TableRow>
);

const TrackableItemPrototypeList = (props) => {
  const { projectId, activityId, trackableItemId } = props;
  const eventPrototypeApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${trackableItemId}/events`);
  const eventPrototypesData = eventPrototypeApi.data ?? [];

  useEffect(() => {
    if (projectId && activityId && trackableItemId) {
      eventPrototypeApi.fetch();
    }
  }, [projectId, activityId, trackableItemId]);

  if (eventPrototypeApi.isLoading && !eventPrototypesData.length) {
    return <ActivityItemListSkeleton />;
  }

  return (
    <>
      {(eventPrototypesData ?? []).map((item) => (
        <TableRow key={`${item.id}-${trackableItemId}-proto`}>
          <TableCell>{item.message}</TableCell>
          <TableCell>{item.startDate}</TableCell>
          <TableCell>{item.recurring}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default observer(TrackableItemPrototypeList);
