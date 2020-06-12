import { setCommonState } from 'use-common-state';

const openLoginForm = (isOpen) => {
  setCommonState('openLoginForm', isOpen);
};

export default openLoginForm;
