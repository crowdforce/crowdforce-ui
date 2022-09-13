import {
    Collapse,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

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
                <IconButton size="large">
                    <NotificationsNoneIcon />
                </IconButton>
                <IconButton onClick={onToggle} size="large">
                    {expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={expanded}>
            {children}
        </Collapse>
    </>
)

export default ProjectListItem
