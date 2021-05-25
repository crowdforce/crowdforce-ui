import {
  LinearProgress, Typography, Card, CardHeader, CardContent, Button,
} from '@material-ui/core';
import { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react-lite';
import classes from './ProjectCard.module.css';
import useApi from '../../utils/useApi';

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
  const project = useApi(`/api/projects/${projectId}`);
  const projectData = project.data ?? {};

  useEffect(() => {
    if (projectId) {
      project.fetch();
    }
  }, [projectId]);

  if (project.isLoading && !projectData) {
    return <ProjectCardSkeleton />;
  }

  return (
    <Card className={classes.root}>
      {project.isLoading && <div className={classes.progress}><LinearProgress /></div>}
      <div className={classes.header}>
        <CardHeader title={projectData.name} />
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
    </Card>
  );
};

export default observer(ProjectCard);
