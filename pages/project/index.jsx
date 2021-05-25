import { Button, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ActivityList from '../../components/AcivityList';

const ProjectPage = () => {
  const { query } = useRouter();

  const handleTabChange = (e, value) => {
    console.log(value);
  };

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
          <div style={{ padding: '20px 0' }}>
            <Button variant="contained" color="primary">Добавить активность</Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ProjectPage;
