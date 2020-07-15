import { setCommonState } from 'use-common-state';
import axios from 'axios';

const fetchUser = () => {
  setCommonState('user.isLoading', true);
  return axios('api/auth/user')
    .then(({ data }) => setCommonState('user.data', data))
    .catch((error) => setCommonState('user', { data: null, error }))
    .finally(() => setCommonState('user.isLoading', false));
};

export default fetchUser;
