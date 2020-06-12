import {
  Dialog, DialogContent, TextField, DialogTitle, Button,
} from '@material-ui/core';
import useCommonState from 'use-common-state';
import classes from './LoginForm.module.css';
import openLoginForm from '../../actions/openLoginForm';

const LoginForm = () => {
  const [open] = useCommonState('openLoginForm');

  return (
    <Dialog onClose={() => openLoginForm(false)} open={open}>
      <DialogTitle>Вход через телеграм</DialogTitle>
      <form className={classes.root}>
        <DialogContent>
          <TextField autoFocus fullWidth label="@username" variant="outlined" />
          <div className={classes.button}>
            <Button type="submit" variant="contained" color="primary">получить код</Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LoginForm;
