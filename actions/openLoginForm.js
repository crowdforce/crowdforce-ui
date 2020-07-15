import { setCommonState } from 'use-common-state';

const openLoginForm = (isOpen, closable) => {
  setCommonState('openLoginForm', isOpen);
};

export default openLoginForm;
