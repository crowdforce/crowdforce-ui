import {
  Table, TableRow, TableCell, TableBody, IconButton,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import AddIcon from '@material-ui/icons/Edit';
import classes from './ActivityItemList.module.css';
import useApi from '../../utils/useApi.ts';
import TrackableItemPrototypeList from '../TrackableItemPrototypeList';
import TrackableItemPrototypeListEditor from '../TrackableItemPrototypeListEditor';

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
  const [openPrototypeEditor, setOpenPrototypeEditor] = useState({
    isOpen: false,
    elementId: null,
  });

  const handlePrototypeEditorOpen = (e) => {
    setOpenPrototypeEditor({
      isOpen: true,
      elementId: e.currentTarget.dataset.trackableItemId,
    });
  };

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
            <>
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <IconButton
                    data-trackable-item-id={item.id}
                    onClick={handlePrototypeEditorOpen}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TrackableItemPrototypeList
                projectId={projectId}
                activityId={activityId}
                trackableItemId={item.id}
              />
              {(openPrototypeEditor.isOpen && parseInt(openPrototypeEditor.elementId, 10) === item.id
              && (
              <TrackableItemPrototypeListEditor
                projectId={projectId}
                activityId={activityId}
                trackableItemId={item.id}
              />
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default observer(ActivityItemList);
