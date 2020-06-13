import { useEffect, useState } from 'react';
import { LinearProgress, List, Paper } from '@material-ui/core';
import classes from './MapProjectList.module.css';
import ProjectListItem from '../ProjectListItem';
import ActivityListItem from '../ActivityListItem';

const MapProjectList = ({ projects, isLoading, activeProjectId = null }) => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [highlightedProjectId, setHighlightedProjectId] = useState(null);
  const toggleProject = (projectId) => {
    setExpandedProjectId(projectId === expandedProjectId ? null : projectId);
  };
  useEffect(() => {
    if (activeProjectId === null) return;
    setHighlightedProjectId(activeProjectId);
    setExpandedProjectId(activeProjectId);
    setTimeout(() => setHighlightedProjectId(null), 500);
  }, [activeProjectId]);
  return (
    <Paper className={classes.root} elevation={3}>
      {isLoading && <LinearProgress style={{ marginBottom: '-4px' }}/>}
      <List>
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            data={project}
            onClick={console.log}
            onToggle={() => toggleProject(project.id)}
            highlighted={highlightedProjectId === project.id}
            expanded={expandedProjectId === project.id}>
            {project.activities.map((activity) => (
              <ActivityListItem key={activity.id} data={activity}/>
            ))}
          </ProjectListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MapProjectList;
