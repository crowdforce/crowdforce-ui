import {
  Button,
  Dialog, DialogContent, DialogTitle, Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ajax from '../../utils/ajax';
import classes from './TrackableItemEditor.module.css';
import Form from '../Form';
import FormInput from '../Form/FormInput';
import useApi from '../../utils/useApi.ts';
import formClasses from '../Form/Form.module.css';

const TrackableItemEditor = (props) => {
  const {
    open,
    onClose,
    projectId,
    activityId,
    onDelete = () => {},
    trackableItemId = null,
  } = props;
  const trackableItemsApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items`);
  const trackableItemApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${trackableItemId}`);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const formData = trackableItemId ? {
    ...(trackableItemApi.data || {}),
  } : {};

  useEffect(() => {
    if (trackableItemId !== null) {
      trackableItemId.fetch();
    }
  }, [trackableItemId]);

  const handleDelete = () => {
    ajax.delete(`/api/projects/${projectId}/activities/${activityId}/items/${trackableItemId}`).then(() => {
      trackableItemsApi.fetch();
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
    };
    const request = trackableItemId !== null ? ajax.put(`/api/projects/${projectId}/activities/${activityId}/items/${trackableItemId}`, submitData)
      : ajax.post(`/api/projects/${projectId}/activities/${activityId}/items`, submitData);

    return request.then(() => {
      trackableItemApi.fetch();
      trackableItemsApi.fetch();
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
          loading={trackableItemId !== null && trackableItemApi.isLoading}
          formData={formData}
          submit={submit}
          authMessage="Войдите, чтобы создать новую активность"
        >
          <DialogTitle>{trackableItemId !== null ? 'Редактировать интерактивный элемент' : 'Новый интерактивный элемент'}</DialogTitle>
          <DialogContent>
            <FormInput
              name="name"
              label="Название интеративного элемента"
            />
          </DialogContent>
          <div className={classes.dialogActions}>
            <Button onClick={onClose}>Отмена</Button>
            <div>
              {trackableItemId !== null && <Button style={{ marginRight: '16px' }} onClick={handleDeleteButtonClick}>Удалить</Button>}
              <Button type="submit" color="primary" variant="contained">{trackableItemId !== null ? 'Редактировать' : 'Отправить'}</Button>
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
            {trackableItemsApi.data?.name}
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

export default observer(TrackableItemEditor);
