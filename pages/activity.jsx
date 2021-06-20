import { useRouter } from 'next/router';
import {
  IconButton, Typography, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard/ProjectCard';
<<<<<<< HEAD
import useApi from '../utils/useApi';
=======
import useApi from '../utils/useApi.ts';
>>>>>>> master
import formatDate from '../utils/formatDate';
import ActivityEditor from '../components/ActivityEditor';
import Form from '../components/Form';
import FormInput from '../components/Form/FormInput';

const ActivityPage = () => {
  const { query, push } = useRouter();
  const activityApi = useApi(`/api/projects/${query.projectId}/activities/${query.activityId}`);
  const activityItemsApi = useApi(`/api/projects/${query.projectId}/activities/${query.activityId}/items`);
  const activityData = activityApi.data ?? {};
  const projectApi = useApi(`/api/projects/${query.projectId}`);
  const [openActivityEditor, setOpenActivityEditor] = useState(false);
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
<<<<<<< HEAD
          <div>
            <Typography variant="h6" style={{ paddingBottom: '20px' }}>Интерактивные элементы</Typography>
            {activityItemsApi.data ? activityItemsApi.data.map((activityItem) => (
              <ListItem disableGutters>
                <ListItemAvatar>
                  <div style={{
                    backgroundColor: activityItem.status, width: '40px', height: '40px', borderRadius: '100%',
                  }}
                  />
                </ListItemAvatar>
                <ListItemText primary={activityItem.name} />
              </ListItem>
            )) : (<div>Loading...</div>)}
            {isOwner && (
              <Form>
                <FormInput
                  name="name"
                  label="Добавить интерактивный элемент"
                />
              </Form>
            )}
          </div>
=======
          {projectApi.data?.privilege === 'OWNER' && (
            <div style={{ padding: '20px 0' }}>
              <Button onClick={handleEditButtonClick}>Редактировать</Button>
            </div>
          )}
>>>>>>> master
        </div>
      </div>
      <ActivityEditor
        projectId={query.projectId}
        activityId={query.activityId}
        open={openActivityEditor}
        onClose={handleActivityEditorClose}
        onDelete={handleDelete}
      />
    </Page>
  );

  // return (
  //   <Page>
  //     <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
  //       <div style={{
  //         position: 'relative', width: '450px', marginRight: '40px', flexShrink: 0,
  //       }}
  //       >
  //         <ProjectCard projectId={query.projectId} />
  //       </div>
  //       <div style={{ flexGrow: 1 }}>
  //         <div style={{ padding: '44px 0' }}>
  //           {activityData.name ? (
  //             <>
  //               <Typography variant="h5">
  //                 {activityData.name}
  //                 {projectApi.data?.privilege === 'OWNER' && (
  //                   <IconButton onClick={handleEditButtonClick}>
  //                     <EditIcon />
  //                   </IconButton>
  //                 )}
  //               </Typography>
  //               <Typography variant="caption" color="textSecondary">
  //                 {formatDate(activityData.startDate)}
  //                 {activityData.endDate && ` - ${formatDate(activityData.endDate)}`}
  //               </Typography>
  //               <Typography style={{ paddingTop: '20px' }}>{activityData.description}</Typography>
  //             </>
  //           ) : (
  //             <>
  //               <Skeleton width={200} />
  //               <div style={{ paddingTop: '20px' }}>
  //                 <Skeleton width={600} />
  //               </div>
  //             </>
  //           )}
  //         </div>
  //         <div>
  //           <Typography variant="h6" style={{ paddingBottom: '20px' }}>Интерактивные элементы</Typography>
  //           {activityItemsApi.data ? activityItemsApi.data.map((activityItem) => (
  //             <ListItem disableGutters>
  //               <ListItemAvatar>
  //                 <div style={{
  //                   backgroundColor: activityItem.status, width: '40px', height: '40px', borderRadius: '100%',
  //                 }}
  //                 />
  //               </ListItemAvatar>
  //               <ListItemText primary={activityItem.name} />
  //             </ListItem>
  //           )) : (<div>Loading...</div>)}
  //           {projectApi.data?.privilege === 'OWNER' && (
  //             <Form>
  //               <FormInput
  //                 name="name"
  //                 label="Добавить интерактивный элемент"
  //               />
  //             </Form>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //     <ActivityEditor
  //       projectId={query.projectId}
  //       activityId={query.activityId}
  //       open={openActivityEditor}
  //       onClose={handleActivityEditorClose}
  //       onDelete={handleDelete}
  //     />
  //   </Page>
  // );
};

export default observer(ActivityPage);
