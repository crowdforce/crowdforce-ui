import {
  Button,
  Dialog, DialogContent, DialogTitle, Typography,
  Radio,
  RadioGroup, FormControlLabel,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ajax from '../../utils/ajax';
import classes from './EventEditor.module.css';
import Form from '../Form';
import FormInput from '../Form/FormInput';
import useApi from '../../utils/useApi';
import formClasses from '../Form/Form.module.css';

const recurringMap = {
  NON_RECURRING: 'Не повторять',
  DAILY: 'Ежедневно',
  WEEKLY: 'Еженедельно',
  TWO_WEEK: 'Каждые две недели',
};

const EventEditor = (props) => {
  const {
    open,
    onClose,
    projectId = null,
    onDelete = () => {},
    activityId = null,
    activityItemId = null,
    eventId = null,
  } = props;
  const eventsApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}/events`);
  const eventApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}/events/${eventId}`);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const startDate = eventApi.data?.startDate;
  const [formData, setFormData] = useState(() => (eventId ? {
    ...(eventApi.data || {}),
    startDate: startDate && new Date(startDate).toISOString().substring(0, 10),
  } : {}));

  useEffect(() => {
    if (eventId !== null) {
      eventApi.fetch();
    }
  }, [eventId]);

  const handleDelete = () => {
    ajax.delete(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}/events/${eventId}`).then(() => {
      eventsApi.fetch();
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

  const handleRecurringChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      recurring: value,
    }));
  };

  const handleFormChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const submit = () => {
    const submitData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
    };
    const request = eventId !== null ? ajax.put(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}/events`, submitData)
      : ajax.post(`/api/projects/${projectId}/activities/${activityId}/items/${activityItemId}/events`, submitData);

    return request.then(() => {
      eventsApi.fetch();
      if (eventId) {
        eventApi.fetch();
      }
      setFormData({});
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
          loading={eventId !== null && eventApi.isLoading}
          formData={formData}
          onChange={handleFormChange}
          submit={submit}
        >
          <DialogTitle>{eventId !== null ? 'Редактировать событие' : 'Новое событие'}</DialogTitle>
          <DialogContent>
            <FormInput
              name="message"
              label="Сообщение"
            />
            <FormInput
              label="Начало"
              type="date"
              name="startDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={classes.formField}>
              <RadioGroup aria-label="gender" name="recurring" value={formData.recurring || 'NON_RECURRING'} onChange={handleRecurringChange}>
                <FormControlLabel value="NON_RECURRING" control={<Radio />} label={recurringMap.NON_RECURRING} />
                <FormControlLabel value="DAILY" control={<Radio />} label={recurringMap.DAILY} />
                <FormControlLabel value="WEEKLY" control={<Radio />} label={recurringMap.WEEKLY} />
                <FormControlLabel value="TWO_WEEK" control={<Radio />} label={recurringMap.TWO_WEEK} />
              </RadioGroup>
            </div>
          </DialogContent>
          <div className={classes.dialogActions}>
            <Button onClick={onClose}>Отмена</Button>
            <div>
              {eventId !== null && <Button style={{ marginRight: '16px' }} onClick={handleDeleteButtonClick}>Удалить</Button>}
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
        <DialogTitle>Удалить событие</DialogTitle>
        <DialogContent>
          <Typography style={{ paddingBottom: '20px' }}>
            Вы уверены, что хотите удалить событие?
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

export default observer(EventEditor);
