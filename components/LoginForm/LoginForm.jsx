import {
  Dialog, DialogContent, TextField, DialogTitle, Button, LinearProgress,
} from '@material-ui/core';
import useCommonState from 'use-common-state';
import { useState } from 'react';
import Schema from 'validate';
import { Alert } from '@material-ui/lab';
import classes from './LoginForm.module.css';
import openLoginForm from '../../actions/openLoginForm';

const schema = new Schema({
  username: {
    type: String,
    required: true,
    message: 'Обязательное поле',
  },
});

const LoginForm = () => {
  const [open = false] = useCommonState('openLoginForm');
  const [formData, setFormData] = useState({
    username: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const errors = schema.validate(formData);

    errors.forEach((error) => {
      const { path, message } = error;
      setFormErrors((prev) => ({ ...prev, [path]: message }));
    });

    if (!errors.length) {
      setLoading(true);
      window.fetch('api/sendCode', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json())
        .then((json) => {
          if (json.error) {
            setFormErrors({ global: json.message || json.error });
          }
        })
        .catch((err) => setFormErrors({ global: err.message }))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Dialog onClose={() => openLoginForm(false)} open={open}>
      {loading && (
        <LinearProgress style={{ marginBottom: '-4px' }} />
      )}
      {formErrors.global && (
        <Alert severity="error">
          {formErrors.global}
        </Alert>
      )}
      <DialogTitle>Вход через телеграм</DialogTitle>
      <form className={classes.root} onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            fullWidth
            helperText={formErrors.username}
            error={!!formErrors.username}
            label="@username"
            variant="outlined"
            name="username"
          />
          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              получить код
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LoginForm;
