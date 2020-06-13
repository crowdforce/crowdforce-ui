import {
  Collapse,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import classes from './MapProjectList.module.css';
import { useState } from 'react';

const MapProjectList = ({ projects, isLoading }) => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  return (
    <Paper className={classes.root} elevation={3}>
      {isLoading && <LinearProgress style={{ marginBottom: '-4px' }}/>}
      <List>
        {projects.map((project) => (
          <>
            <ListItem key={project.id} button dense divider href={`/project?id=${project.id}`}>
              <ListItemText primary={project.name}
                            secondary={`Активностей в проекте ${project.activities.length}`}
              />
              <ListItemSecondaryAction>
                <div className={classes.aside}>
                  <IconButton>
                    <NotificationsNoneIcon/>
                  </IconButton>
                  <IconButton>
                    {project.id === expandedProjectId ?
                      <ExpandLess onClick={() => setExpandedProjectId(null)}/> :
                      <ExpandMore onClick={() => setExpandedProjectId(project.id)}/>}
                  </IconButton>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={project.id === expandedProjectId}>
              {project.activities.map((activity) => (
                <Activity data={activity}/>
              ))}
            </Collapse>
          </>
        ))}
      </List>
    </Paper>
  );
};

const Activity = ({ data }) => (
  <ListItem key={data.id} button dense divider>
    <ListItemText primary={data.name} secondary={`Завтра с 14-00 до 16-00`}/>
    <ListItemSecondaryAction>
      <div className={classes.aside}>
        <IconButton>
          <NotificationsNoneIcon/>
        </IconButton>
      </div>
    </ListItemSecondaryAction>
  </ListItem>
);


export default MapProjectList;
