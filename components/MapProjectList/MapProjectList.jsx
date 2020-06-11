import {
  Paper, ListItem, ListItemText, ListItemSecondaryAction, IconButton, List,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import classes from './MapProjectList.module.css';

const DATA = [
  {
    label: 'Проект 1',
    activities: 6,
  },
  {
    label: 'Проект 2',
    activities: 2,
  },
  {
    label: 'Проект 3',
    activities: 3,
  },
  {
    label: 'Проект 4',
    activities: 8,
  },
  {
    label: 'Проект 5',
    activities: 3,
  },
  {
    label: 'Проект 6',
    activities: 6,
  },
  {
    label: 'Проект 7',
    activities: 1,
  },
  {
    label: 'Проект 8',
    activities: 9,
  },
  {
    label: 'Проект 9',
    activities: 6,
  },
  {
    label: 'Проект 10',
    activities: 16,
  },
  {
    label: 'Проект 11',
    activities: 6,
  },
];

const MapProjectList = () => (
  <Paper className={classes.root} elevation={3}>
    <List>
      {DATA.map((project) => (
        <ListItem button dense divider>
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

export default MapProjectList;
