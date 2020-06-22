import {
  IconButton, ListItem, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const ActivityListItem = ({ data }) => (
  <ListItem button dense divider>
    <ListItemText primary={data.name} secondary="Завтра с 14-00 до 16-00" />
    <ListItemSecondaryAction>
      <IconButton>
        <NotificationsNoneIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default ActivityListItem;
