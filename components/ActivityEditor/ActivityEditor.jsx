import {
  Button,
  Dialog, DialogContent, DialogTitle, Grid, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ajax from '../../utils/ajax';
import classes from './ActivityEditor.module.css';
import Form from '../Form';
import FormInput from '../Form/FormInput';
import useApi from '../../utils/useApi';
import formClasses from '../Form/Form.module.css';

const ActivityEditor = (props) => {
  const {
    open,
    onClose,
    projectId,
    onDelete = () => {},
    activityId = null,
  } = props;
  const activitiesApi = useApi(`/api/projects/${projectId}/activities`);
  const activityApi = useApi(`/api/projects/${projectId}/activities/${activityId}`);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const startDate = activityApi.data?.startDate;
  const endDate = activityApi.data?.endDate;

  const formData = activityId ? {
    ...(activityApi.data || {}),
    startDate: startDate && new Date(startDate).toISOString().substring(0, 10),
    endDate: endDate && new Date(endDate).toISOString().substring(0, 10),
  } : {};

  useEffect(() => {
    if (activityId !== null) {
      activityApi.fetch();
    }
  }, [activityId]);

  const handleDelete = () => {
    ajax.delete(`/api/projects/${projectId}/activities/${activityId}`).then(() => {
      activitiesApi.fetch();
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

  const submit = (data) => {
    const submitData = {
      ...data,
      startTime: new Date(data.startDate).toISOString(),
      endTime: new Date(data.endDate).toISOString(),
    };
    const request = activityId !== null ? ajax.put(`/api/projects/${projectId}/activities/${activityId}`, submitData)
      : ajax.post(`/api/projects/${projectId}/activities`, submitData);

    return request.then(() => {
      activitiesApi.fetch();
      activityApi.fetch();
      onClose();
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
                  name="startDate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  label="Окончание"
                  type="date"
                  name="endDate"
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
              {activityId !== null && <Button style={{ marginRight: '16px' }} onClick={handleDeleteButtonClick}>Удалить</Button>}
              <Button type="submit" color="primary" variant="contained">Сохранить</Button>
            </div>
          </div>
        </Form>
      </Dialog>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openDeleteDialog}
      >
        <DialogTitle>Удалить активность</DialogTitle>
        <DialogContent>
          <Typography style={{ paddingBottom: '20px' }}>
            Вы уверены, что хотите удалить активность
            {' '}
            {activityApi.data?.name}
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

export default observer(ActivityEditor);
