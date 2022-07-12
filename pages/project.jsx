import { useEffect, useState, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import useApi from '../utils/useApi';
import ActivityEditor from '../components/ActivityEditor';
import ProjectMap, {DrawControlHOC} from '../components/ProjectMap';
import ProjectMapLegend from '../components/ProjectMapLegend';
import geojsonFile from '../public/json/merged.json';
import { featureReduce } from '@turf/meta';
import { getType } from '@turf/invariant';
import Button from '@mui/material/Button';

{ /* <TabPanel value="activities">
  <EventList
    projectId={query.projectId}
    activityId={null}
    activityItemId={null}
  />
  {projectApi.data?.privilege === 'OWNER' && (
    <div style={{ padding: '20px 0' }}>
      <Button onClick={handleNewActivityClick} variant="contained" color="primary">Добавить активность</Button>
    </div>
  )}
</TabPanel> */ }

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

  useEffect(() => {
    if (query.projectId) {
      projectApi.fetch();
    }
  }, [projectApi, query.projectId, userApi.data?.name]);

  const [geojsonList, setGeojsonList] = useState(
    featureReduce(
        geojsonFile,
        (acc, x, i) => (acc.concat([
            {
                type: getType(x),
                name: x.properties?.name ?? `${getType(x)} ${i+1}`,
                id: x.id,
            },
        ])),
        []
    )
  );
    
  const onAction = useCallback(props => {
    const propsIds = props.features.map((x,i) => x.id)
    const changedIds = geojsonList
        .filter((x,i) => propsIds.includes(x.id))
        .map((x,i) => x.id);

    switch (props.type) {
      case 'draw.create':
        setGeojsonList(
            props.features.map((x,i) => ({
                type: getType(x),
                id: x.id,
                name: `New feature`,
            }))
                .concat(geojsonList)
        )
        break;

      case 'draw.delete':
        setGeojsonList(
            geojsonList.filter((x, i) => !changedIds.includes(x.id))
        )
        break;

      default:
        break;
    }
  }, [geojsonList]); 

  return (
    <Page>
        <Stack
          direction={{ sm: 'column', md: 'row' }}
          spacing={2}
          sx={{
            height: '100%',
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '450px',
              flex: '1 0 100%',
            }}
          >
            <ProjectCard projectId={query.projectId} />
          </div>
          <Card
            sx={{
              flex: '1 0 auto',
            }}
          >
            <Stack
              direction={{ sm: 'column', md: 'row' }}
              spacing={2}
              sx={{
                height: '100%',
                maxHeight: '80vh',
              }}
            >

              <CardContent
                style={{
                  flex: '1 0 75%',
                }}
              >
                <ProjectMap 
                    initialGeojson={geojsonFile}
                    onAction={onAction}
                />
              </CardContent>
              <CardContent
                sx={{
                  width: '100%',
                  minWidth: 200,
                  overflowY: 'auto',
                }}
              >
                <ProjectMapLegend 
                    geojsonList={geojsonList} 
                    setGeojsonList={setGeojsonList}
                />
              </CardContent>
            </Stack>
          </Card>
        </Stack>
      <ActivityEditor
        projectId={query.projectId}
        open={openActivityEditor}
        onClose={handleActivityEditorDialogClose}
      />
    </Page>
  );
};

export default observer(ProjectPage);
