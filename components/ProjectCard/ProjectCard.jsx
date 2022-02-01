import {
  LinearProgress, Typography, Card, CardHeader, CardContent, Button, IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { observer } from 'mobx-react-lite';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import classes from './ProjectCard.module.css';
import useApi from '../../utils/useApi';
import ProjectEditor from '../ProjectEditor';

const ProjectCardSkeleton = () => (
  <Card className={classes.root} elevation={3}>
    <CardHeader title={<Skeleton />} />
    <CardContent className={classes.content}>
      <div className={classes.image}>
        <Skeleton variant="rectangular" height="200px" />
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
  }, [projectId, projectApi]);

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
          <IconButton data-activity-id={projectId} onClick={handleEditClick} size="large">
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
