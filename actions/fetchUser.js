import { setCommonState } from 'use-common-state';
import ajax from '../utils/ajax';

const fetchUser = () => {
  setCommonState('user.isLoading', true);
  return ajax('/api/auth/user')
    .then(({ data }) => setCommonState('user.data', data))
    .catch((error) => setCommonState('user', { data: null, error }))
    .finally(() => setCommonState('user.isLoading', false));
};

export default fetchUser;
