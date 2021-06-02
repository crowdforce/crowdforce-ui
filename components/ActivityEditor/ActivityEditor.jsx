import {
  Button,
  Dialog, DialogContent, DialogTitle, Grid,
} from '@material-ui/core';
import { useEffect } from 'react';
import ajax from '../../utils/ajax';
import classes from './ActivityEditor.module.css';
import Form from '../Form';
import FormInput from '../Form/FormInput';
import useApi from '../../utils/useApi.ts';

const ActivityEditor = (props) => {
  const {
    open, onClose, projectId, activityId = null,
  } = props;
  const activitiesApi = useApi(`/api/projects/${projectId}/activities`);
  const activityApi = useApi(`/api/projects/${projectId}/activities/${activityId}`);

  const formData = activityId !== null ? (activityApi.data ?? {}) : {
    startTime: '2017-05-24',
    endTime: '2017-05-24',
  };

  useEffect(() => {
    if (activityId !== null) {
      activityApi.fetch();
    }
  }, [activityId]);

  const submit = (data) => {
    const submitData = {
      ...data,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    };
    const request = activityId !== null ? ajax.put(`/api/projects/${projectId}/activities/${activityId}`, submitData)
      : ajax.post(`/api/projects/${projectId}/activities`, submitData);

    return request.then(() => {
      activitiesApi.fetch();
      onClose();
    });
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      className={classes.root}
      open={open}
      onClose={onClose}
      scroll="body"
    >
      <Form
        loading={activityId !== null && activityApi.isLoading}
        formData={formData}
        submit={submit}
        authMessage="Войдите, чтобы создать новую активность"
      >
        <DialogTitle>{activityId !== null ? 'Редактировать активность' : 'Новая активность'}</DialogTitle>
        <DialogContent>
          <FormInput
            name="name"
            label="Название активности"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormInput
                label="Начало"
                type="date"
                name="startTime"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label="Окончание"
                type="date"
                name="endTime"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <div className={classes.formField}>
            <FormInput
              name="description"
              multiline
              rows={4}
              rowsMax={10}
              label="Описание активности"
            />
          </div>
        </DialogContent>
        <div className={classes.dialogActions}>
          <Button onClick={onClose}>Отмена</Button>
          <div>
            {activityId !== null && <Button style={{ marginRight: '16px' }} onClick={onClose}>Удалить</Button>}
            <Button type="submit" color="primary" variant="contained">{activityId !== null ? 'Редактировать' : 'Отправить'}</Button>
          </div>
        </div>
      </Form>
    </Dialog>
  );
};

export default ActivityEditor;
