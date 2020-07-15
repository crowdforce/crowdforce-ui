import { setCommonState } from 'use-common-state';
import ajax from '../utils/ajax';

const fetchProjects = () => {
  setCommonState('projects.isLoading', true);
  ajax('/api/projects')
    .then(({ data }) => {
      setCommonState('projects.data', data);
    })
    .catch((error) => setCommonState('projects.error', error))
    .finally(() => setCommonState('projects.isLoading', false));
};

export default fetchProjects;
