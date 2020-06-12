import {
  Paper, ListItem, ListItemText, ListItemSecondaryAction, IconButton, List, LinearProgress,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useEffect } from 'react';
import useCommonState from 'use-common-state';
import classes from './MapProjectList.module.css';
import fetchProjects from '../../actions/fetchProjects';

const MapProjectList = () => {
  const [isLoadingProjects] = useCommonState('projects.isLoading');
  const [projects] = useCommonState('projects.json', []);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Paper className={classes.root} elevation={3}>
      {isLoadingProjects && <LinearProgress style={{ marginBottom: '-4px' }} />}
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} button dense divider>
            <ListItemText primary={project.label} secondary={`Активностей в проекте ${project.activities}`} />
            <ListItemSecondaryAction>
              <IconButton>
                <NotificationsNoneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MapProjectList;
