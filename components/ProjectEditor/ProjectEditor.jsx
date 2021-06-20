import {
  Button,
  Dialog, DialogContent, DialogTitle, Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LocationPicker from '../LocationPicker';
import classes from './ProjectEditor.module.css';
import formClasses from '../Form/Form.module.css';
import Form from '../Form';
import FormInput from '../Form/FormInput';
import ajax from '../../utils/ajax';
import useApi from '../../utils/useApi';

const ProjectEditor = (props) => {
  const {
    open, onClose, projectId = null, onDelete,
  } = props;
  const { push } = useRouter();
  const projectApi = useApi(`/api/projects/${projectId}`);
  const projectsApi = useApi('/api/projects');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const formData = {
    location: {
      lat: projectApi.data?.lat ?? 59.937500,
      lng: projectApi.data?.lng ?? 30.308611,
    },
    ...projectApi.data,
  };

  delete formData.lat;
  delete formData.lng;

  const handleDelete = () => {
    ajax.delete(`/api/projects/${projectId}`).then(() => {
      projectsApi.fetch();
      setOpenDeleteDialog(false);
      onDelete();
      onClose();
    });
  };

  const handleDeleteButtonClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogCancel = () => {
    setOpenDeleteDialog(false);
  };

  const submit = ({ name, description, location }) => {
    const data = {
      name,
      description,
      ...location,
    };
    const request = projectId !== null ? ajax.put(`/api/projects/${projectId}`, data) : ajax.post('/api/projects', data);
    return request.then((response) => {
      if (projectId !== null) {
        projectApi.fetch();
        projectsApi.fetch();
        onClose();
      } else {
        push(`/project?projectId=${response.data?.id}`);
      }
    });
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        className={classes.root}
        open={!openDeleteDialog && open}
        onClose={onClose}
        scroll="body"
      >
        <Form
          formData={formData}
          submit={submit}
          authMessage="Войдите, чтобы создать новый проект"
        >
          <DialogTitle>{projectId !== null ? 'Редактировать проект' : 'Новый проект'}</DialogTitle>
          <DialogContent>
            <FormInput
              name="name"
              label="Название проекта"
            />
            <div className={classes.map}>
              <LocationPicker
                name="location"
              />
            </div>
            <FormInput
              name="description"
              multiline
              rows={4}
              rowsMax={10}
              label="Описание проекта"
            />
          </DialogContent>
          <div className={formClasses.formActions}>
            <Button onClick={onClose}>Отмена</Button>
            <div>
              {projectId !== null && <Button style={{ marginRight: '16px' }} onClick={handleDeleteButtonClick}>Удалить</Button>}
              <Button type="submit" color="primary" variant="contained">{projectId !== null ? 'Редактировать' : 'Создать'}</Button>
            </div>
          </div>
        </Form>
      </Dialog>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openDeleteDialog}
      >
        <DialogTitle>Удалить проект</DialogTitle>
        <DialogContent>
          <Typography style={{ paddingBottom: '20px' }}>
            Вы уверены, что хотите удалить проект
            {' '}
            {projectApi.data?.name}
            ?
          </Typography>
        </DialogContent>
        <div className={formClasses.formActions}>
          <Button onClick={handleDeleteDialogCancel} variant="contained" disableElevation>Отмена</Button>
          <Button onClick={handleDelete}>Удалить</Button>
        </div>
      </Dialog>
    </>
  );
};

export default ProjectEditor;
