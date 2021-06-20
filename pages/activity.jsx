import { useRouter } from 'next/router';
import {
  IconButton, Typography, ListItem, ListItemAvatar, ListItemText,
  ListItemSecondaryAction, Tooltip,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import { Fragment, useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import useApi from '../utils/useApi';
import formatDate from '../utils/formatDate';
import ActivityEditor from '../components/ActivityEditor';
import Form from '../components/Form';
import FormInput from '../components/Form/FormInput';
import ajax from '../utils/ajax';
import EventEditor from '../components/EventEditor';
import EventList from '../components/EventList';

const ActivityPage = () => {
  const { query, push } = useRouter();
  const activityApi = useApi(`/api/projects/${query.projectId}/activities/${query.activityId}`);
  const activityItemsApi = useApi(`/api/projects/${query.projectId}/activities/${query.activityId}/items`);
  const activityData = activityApi.data ?? {};
  const projectApi = useApi(`/api/projects/${query.projectId}`);
  const [openActivityEditor, setOpenActivityEditor] = useState(false);
  const [openEventEditor, setOpenEventEditor] = useState(false);
  const [activeActivityItemId, setActiveActivityItemId] = useState(null);
  const [activeEventId, setActiveEventId] = useState(null);
  const isOwner = projectApi.data?.privilege === 'OWNER';

  useEffect(() => {
    if (query.projectId && query.activityId) {
      activityApi.fetch();
      activityItemsApi.fetch();
    }
  }, [query.projectId, query.activityId, activityApi, activityItemsApi]);

  const handleEditButtonClick = () => {
    setOpenActivityEditor(true);
  };

  const handleActivityEditorClose = () => {
    setOpenActivityEditor(false);
  };

  const handleDelete = () => {
    push(`/project?projectId=${query.projectId}`);
  };

  const handleItemDelete = (e) => {
    const { itemId } = e.currentTarget.dataset;
    ajax.delete(`/api/projects/${query.projectId}/activities/${query.activityId}/items/${itemId}`).then(() => {
      activityItemsApi.fetch();
    });
  };

  const submitActivityItemForm = (data) => {
    const request = ajax.post(`/api/projects/${query.projectId}/activities/${query.activityId}/items`, data);
    return request.then(() => {
      activityItemsApi.fetch();
    });
  };

  const handleEventAdd = (e) => {
    const { itemId } = e.currentTarget.dataset;
    setActiveActivityItemId(itemId);
    setOpenEventEditor(true);
  };

  const handleEventEditorClose = () => {
    setActiveActivityItemId(null);
    setActiveEventId(null);
    setOpenEventEditor(false);
  };

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
          <div style={{ padding: '38px 0' }}>
            {activityData.name ? (
              <>
                <Typography variant="h5">
                  {activityData.name}
                  {isOwner && (
                    <IconButton onClick={handleEditButtonClick}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Typography>
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
          <>
            <div style={{ paddingBottom: '20px' }}>
              {activityItemsApi.data ? activityItemsApi.data.map((activityItem) => (
                <Fragment key={activityItem.id}>
                  <ListItem disableGutters ContainerComponent="div">
                    <ListItemAvatar>
                      <div style={{
                        backgroundColor: activityItem.status, width: '40px', height: '40px', borderRadius: '100%',
                      }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={activityItem.name} />
                    {isOwner && (
                      <ListItemSecondaryAction>
                        <Tooltip title="Добавить событие">
                          <IconButton edge="start" aria-label="add" onClick={handleEventAdd} data-item-id={activityItem.id}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить элемент">
                          <IconButton edge="end" aria-label="delete" onClick={handleItemDelete} data-item-id={activityItem.id}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                  <div style={{ paddingLeft: '40px' }}>
                    <EventList
                      projectId={query.projectId}
                      activityId={query.activityId}
                      activityItemId={activityItem.id}
                    />
                  </div>
                </Fragment>
              )) : (<div>Loading...</div>)}
            </div>
            {isOwner && (
              <Form submit={submitActivityItemForm} resetData>
                <FormInput
                  name="name"
                  label="Добавить элемент"
                  InputProps={{
                    endAdornment: (
                      <Tooltip title="Добавить элемент">
                        <IconButton type="submit">
                          <ArrowForwardIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Form>
            )}
          </>
        </div>
      </div>
      <ActivityEditor
        projectId={query.projectId}
        activityId={query.activityId}
        open={openActivityEditor}
        onClose={handleActivityEditorClose}
        onDelete={handleDelete}
      />
      <EventEditor
        projectId={query.projectId}
        activityId={query.activityId}
        activityItemId={activeActivityItemId}
        eventId={activeEventId}
        open={openEventEditor}
        onClose={handleEventEditorClose}
      />
    </Page>
  );
};

export default observer(ActivityPage);
