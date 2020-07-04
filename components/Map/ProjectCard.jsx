import {
  LinearProgress, Typography, ListItem, ListItemText, Card, CardHeader, CardContent, CardActionArea, Button, Link,
} from '@material-ui/core';
import useCommonState from 'use-common-state';
import { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import classes from './ProjectCard.module.css';
import fetchProject from '../../actions/fetchProject';

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
  const [isLoading = true] = useCommonState(['projects', projectId, 'isLoading']);
  const [projectJson] = useCommonState(['projects', projectId, 'json']);

  useEffect(() => {
    fetchProject({ projectId });
  }, [projectId]);

  if (isLoading && !projectJson) {
    return <ProjectCardSkeleton />;
  }

  return (
    <Card className={classes.root}>
      {isLoading && <div className={classes.progress}><LinearProgress /></div>}
      <CardHeader title={projectJson.name} />
      <div className={classes.content}>
        <div className={classes.image}>
          <img alt={projectJson.name} src={projectJson.imageUrl} />
        </div>
        <div className={classes.description}>
          <Typography>{projectJson.description}</Typography>
        </div>
      </div>
      <div className={classes.footer}>
        <Button onClick={onClose}>Закрыть</Button>
        <Link href={`/project?id=${projectId}`}>
          <Button variant="contained" color="primary">Подробнее</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProjectCard;
