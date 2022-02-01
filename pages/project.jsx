import { Button, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import ActivityList from '../components/AcivityList';
import useApi from '../utils/useApi';
import ActivityEditor from '../components/ActivityEditor';

const ProjectPage = () => {
  const { query } = useRouter();
  const projectApi = useApi(`/api/projects/${query.projectId}`);
  const userApi = useApi('/api/auth/user');
  const [openActivityEditor, setOpenActivityEditor] = useState(false);

  const handleNewActivityClick = (e) => {
    e.preventDefault();
    setOpenActivityEditor(true);
  };

  const handleActivityEditorDialogClose = () => {
    setOpenActivityEditor(false);
  };

  const handleTabChange = (e, value) => {
    console.log(value);
  };

  useEffect(() => {
    if (query.projectId) {
      projectApi.fetch();
    }
  }, [query.projectId, userApi.data?.name]);

  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{
          position: 'relative', width: '450px', marginRight: '40px', flexShrink: 0,
        }}
        >
          <ProjectCard projectId={query.projectId} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ padding: '36px 0' }}>
            <Tabs value={0} onChange={handleTabChange}>
              <Tab label="Активности" />
            </Tabs>
          </div>
          <ActivityList projectId={query.projectId} />
          {projectApi.data?.privilege === 'OWNER' && (
            <div style={{ padding: '20px 0' }}>
              <Button onClick={handleNewActivityClick} variant="contained" color="primary">Добавить активность</Button>
            </div>
          )}
        </div>
      </div>
      <ActivityEditor
        projectId={query.projectId}
        open={openActivityEditor}
        onClose={handleActivityEditorDialogClose}
      />
    </Page>
  );
};

export default observer(ProjectPage);
