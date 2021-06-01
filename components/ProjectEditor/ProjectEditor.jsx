import {
  Button,
  CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ajax from '../../utils/ajax';
import LocationPicker from '../LocationPicker';
import classes from './ProjectEditor.module.css';

const ProjectEditor = (props) => {
  const { open, onClose, projectId } = props;
  const { query, push } = useRouter();
  const [formData, setFormData] = useState({
    lat: 59.937500,
    lng: 30.308611,
  });
  const [formError, setFormError] = useState({});
  const [isSaving, setIsSaving] = useState(false);

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
    const request = projectId ? ajax.put(`/api/projects/${projectId}`, formData) : ajax.post('/api/projects', formData);
    request
      .then((response) => {
        push(`/project?projectId=${response.data?.id}`);
      })
      .catch((error) => {
        setFormError(error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <Dialog maxWidth="sm" fullWidth className={classes.root} open={open} onClose={onClose} scroll="body">
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Новый проект</DialogTitle>
        <DialogContent>
          <div className={classes.formField}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              name="name"
              label="Название проекта"
            />
          </div>
          <div className={classes.map}>
            <LocationPicker
              lat={formData.lat}
              lng={formData.lng}
              onChange={handleLocationChange}
            />
          </div>
          <div className={classes.formField}>
            <TextField
              name="description"
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
              rowsMax={10}
              fullWidth
              label="Описание проекта"
            />
          </div>
        </DialogContent>
        <div className={classes.dialogActions}>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" color="primary" variant="contained">Отправить</Button>
        </div>
      </form>
      {isSaving && (
        <div className={classes.progressContainer}>
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default ProjectEditor;
