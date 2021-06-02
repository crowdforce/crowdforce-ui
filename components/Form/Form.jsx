/* eslint-disable react/jsx-props-no-spreading */
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import formClasses from './Form.module.css';
import FormLogin from './FormLogin';
import FormProgress from './FormProgress';
import useApi from '../../utils/useApi';

export const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

const Form = ({
  children,
  formData: formDataProp = {},
  authMessage,
  submit,
  loading: loadingProp,
}) => {
  const userApi = useApi('/api/auth/user');
  const [formData, setFormData] = useState(formDataProp);
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const isLoading = loadingProp || isSaving;

  const requireLogin = authMessage && !userApi.data?.name;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFormErrors({});

    try {
      await submit(formData);
    } catch (error) {
      setFormErrors(error);
    }

    setIsSaving(false);
  };

  return (
    <FormContext.Provider value={{
      formData,
      formErrors,
      handleInputChange,
    }}
    >
      <form onSubmit={handleFormSubmit} className={formClasses.root}>
        {requireLogin ? <FormLogin message={authMessage} /> : children}
        {isLoading && <FormProgress />}
      </form>
    </FormContext.Provider>
  );
};

export default observer(Form);
