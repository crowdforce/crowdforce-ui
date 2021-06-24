import {
  Typography, Table, TableRow, TableCell, TableBody, IconButton,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import EditIcon from '@material-ui/icons/Edit';
import classes from './EventList.module.css';
import useApi from '../../utils/useApi';
import formatDate from '../../utils/formatDate';
import EventEditor from '../EventEditor';

const recurringMap = {
  NON_RECURRING: 'Не повторяется',
  DAILY: 'Ежедневно',
  WEEKLY: 'Еженедельно',
  TWO_WEEK: 'Каждые две недели',
};

const EventListSkeleton = () => (
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

const EventList = ({
  projectId,
  activityId,
  activityItemId,
}) => {
  const eventsApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}/events`);
  const [editEventId, setEditEventId] = useState(null);

  useEffect(() => {
    eventsApi.fetch();
  }, [eventsApi]);

  const handleEditClick = (e) => {
    const { eventId } = e.currentTarget.dataset;
    setEditEventId(eventId);
  };

  const handleEventEditorClose = () => {
    setEditEventId(null);
  };

  if (eventsApi.isLoading && !eventsApi.data?.length) {
    return <EventListSkeleton />;
  }

  return (
    <div className={classes.root}>
      {Boolean(eventsApi.data?.length) && (
        <Table style={{ tableLayout: 'fixed' }}>
          <TableBody>
            {eventsApi.data.map((event, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={index}>
                <TableCell style={{ verticalAlign: 'top' }}>
                  <Typography>
                    {event.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDate(event.startDate)}
                  </Typography>
                </TableCell>
                <TableCell>{recurringMap[event.recurring]}</TableCell>
                <TableCell>
                  <IconButton
                    data-event-id={event.id}
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <EventEditor
        projectId={projectId}
        activityId={activityId}
        activityItemId={activityItemId}
        eventId={editEventId}
        open={Boolean(editEventId)}
        onClose={handleEventEditorClose}
      />
    </div>
  );
};

export default observer(EventList);
