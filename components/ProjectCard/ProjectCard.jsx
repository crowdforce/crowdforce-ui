import {
  LinearProgress, Typography, Card, CardHeader, CardContent, Button, IconButton,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import classes from './ProjectCard.module.css';
import useApi from '../../utils/useApi.ts';
import ProjectEditor from '../ProjectEditor';

const ProjectCardSkeleton = () => (
  <Card className={classes.root} elevation={3}>
    <CardHeader title={<Skeleton />} />
    <CardContent className={classes.content}>
      <div className={classes.image}>
        <Skeleton variant="rect" height="200px" />
      </div>
      <div className={classes.description}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </CardContent>
  </Card>
);

const ProjectCard = (props) => {
  const { projectId, onClose } = props;
  const projectApi = useApi(`/api/projects/${projectId}`);
  const projectData = projectApi.data ?? {};
  const isLoadingProject = projectApi.isLoading ?? true;
  const [openProjectEditor, setOpenProjectEditor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (projectId) {
      projectApi.fetch();
    }
  }, [projectId]);

  const handleEditClick = () => {
    setOpenProjectEditor(true);
  };

  const handleDelete = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      router.push('/');
    }
  };

  const handleProjectEditorDialogClose = () => {
    setOpenProjectEditor(false);
  };

  if (isLoadingProject && !projectData) {
    return <ProjectCardSkeleton />;
  }

  return (
    <Card className={classes.root}>
      {isLoadingProject && <div className={classes.progress}><LinearProgress /></div>}
      <div className={classes.header}>
        <Typography variant="h5">
          <a href={`/project?projectId=${projectId}`}>{projectData.name}</a>
        </Typography>
        {projectApi.data?.privilege === 'OWNER' && (
        <IconButton
          data-activity-id={projectId}
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>

        )}
      </div>
      <div className={classes.content}>
        {projectData.imageUrl && (
        <div className={classes.image}>
          <img alt={projectData.name} src={projectData.imageUrl} />
        </div>
        )}
        <div className={classes.description}>
          <Typography>{projectData.description}</Typography>
        </div>
      </div>
      {typeof onClose === 'function' && (
        <div className={classes.footer}>
          <Button onClick={onClose}>Закрыть</Button>
          <Button href={`/project?projectId=${projectId}`} variant="contained" color="primary">
            Подробнее
          </Button>
        </div>
      )}
      <ProjectEditor
        projectId={projectId}
        open={openProjectEditor}
        onClose={handleProjectEditorDialogClose}
        onDelete={handleDelete}
      />
    </Card>
  );
};

export default observer(ProjectCard);
