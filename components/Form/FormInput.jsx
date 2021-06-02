/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@material-ui/core';
import formClasses from './Form.module.css';
import { useFormContext } from './Form';

const FormInput = (props) => {
  const { name } = props;
  const { handleInputChange, formData } = useFormContext();

  return (
    <div className={formClasses.field}>
      <TextField
        variant="outlined"
        fullWidth
        value={formData[name] || ''}
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );
};

export default FormInput;
