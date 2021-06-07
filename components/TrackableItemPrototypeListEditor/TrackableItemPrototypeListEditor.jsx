import {
  TableRow, TableCell, Button,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import useApi from '../../utils/useApi.ts';
import ajax from '../../utils/ajax';
import Form from '../Form/Form';
import FormInput from '../Form/FormInput';

const TrackableItemPrototypeListEditor = (props) => {
  const { projectId, activityId, trackableItemId } = props;
  const eventPrototypeApi = useApi(`/api/projects/${projectId}/activities/${activityId}/items/${trackableItemId}/events`);

  const submit = (data) => {
    const submitData = {
      ...data,
      recurring: 'WEEKLY',
    };

    const request = ajax.post(`/api/projects/${projectId}/activities/${activityId}/items/${trackableItemId}/events`, submitData);

    return request.then(() => {
      eventPrototypeApi.fetch();
    });
  };

  return (
    <>
      <Form
        submit={submit}
      >
        <TableRow key={`${trackableItemId}-editor`}>
          <TableCell>
            <FormInput
              name="message"
              label="Шаблон эвента"
            />
          </TableCell>
          <TableCell>
            <FormInput
              label="Начало"
              type="date"
              name="startDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </TableCell>
          WEEKLY
          <TableCell />
          <TableCell>
            <Button type="submit" color="primary" variant="contained">Отправить</Button>
          </TableCell>
        </TableRow>
      </Form>
    </>
  );
};

export default observer(TrackableItemPrototypeListEditor);
