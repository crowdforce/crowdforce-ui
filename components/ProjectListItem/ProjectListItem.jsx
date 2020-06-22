import {
  Collapse,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const ProjectListItem = ({
  data, onClick, onToggle, expanded, highlighted, children,
}) => (
  <>
    <ListItem
      button
      dense
      divider
      selected={highlighted}
      onClick={onClick}
      href={`/project?id=${data.id}`}
    >
      <ListItemText
        primary={data.name}
        secondary={`Активностей в проекте ${data.activities.length}`}
      />
      <ListItemSecondaryAction>
        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>
        <IconButton onClick={onToggle}>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Collapse in={expanded}>
      {children}
    </Collapse>
  </>
);

export default ProjectListItem;
