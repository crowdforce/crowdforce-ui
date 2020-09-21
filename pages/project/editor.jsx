import {
  Grid, TextField, FormControl, Button, Snackbar,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useCommonState from 'use-common-state';
import { Alert, Skeleton } from '@material-ui/lab';
import Page from '../../components/Page';
import LocationPicker from '../../components/LocationPicker';
import fetchProject from '../../actions/fetchProject';
import ajax from '../../utils/ajax';

const Loader = () => (
  <>
    <Skeleton variant="rect" />
    <Skeleton variant="rect" />
  </>
);

const ProjectEditorPage = () => {
  const { query, push } = useRouter();
  const { id: projectId } = query;
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [formErrorOpen, setFormErrorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isProjectLoading] = useCommonState(['projects', projectId, 'isLoading']);
  const [name] = useCommonState(['projects', projectId, 'data', 'name']);
  const [description] = useCommonState(['projects', projectId, 'data', 'description']);
  const [lat] = useCommonState(['projects', projectId, 'data', 'lat']);
  const [lng] = useCommonState(['projects', projectId, 'data', 'lng']);

  useEffect(() => {
    if (projectId) {
      fetchProject({ projectId });
    }
  }, [projectId]);

  useEffect(() => {
    setFormData({
      name, description, lat, lng,
    });
  }, [name, description, lat, lng]);

  const handleLocationChange = (location) => {
    setFormData((data) => ({ ...data, ...location }));
  };

  const handleInputChange = (e) => {
    const { name: inputName, value } = e.target;
    setFormData((data) => ({ ...data, [inputName]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFormError({});
    setFormErrorOpen(false);
    const request = projectId ? ajax.put(`/api/projects/${projectId}`, formData) : ajax.post('/api/projects', formData);
    request
      .then(() => {
        if (projectId) {
          push(`/project?id=${projectId}`);
        } else {
          push('/');
        }
      })
      .catch((error) => {
        setFormErrorOpen(true);
        setFormError(error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <Page>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={4}>
          <Grid item xs>
            <LocationPicker
              lat={formData.lat}
              lng={formData.lng}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs>
            {isProjectLoading ? <Loader /> : (
              <>
                <FormControl fullWidth margin="normal">
                  <TextField
                    onChange={handleInputChange}
                    name="name"
                    variant="outlined"
                    label="Название проекта"
                    value={formData.name || ''}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    onChange={handleInputChange}
                    name="description"
                    variant="outlined"
                    label="Описание проекта"
                    multiline
                    rows={24}
                    rowsMax={24}
                    value={formData.description || ''}
                  />
                </FormControl>
              </>
            )}
          </Grid>
        </Grid>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSaving}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <Snackbar
        open={formErrorOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setFormErrorOpen(false)}>
          {formError.message || formError.error}
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default ProjectEditorPage;
