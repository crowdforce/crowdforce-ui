import { setCommonState } from 'use-common-state';

const fetchProjects = () => {
  setCommonState('projects.isLoading', true);
  window.fetch('api/projects')
    .then((res) => res.json())
    .then((json) => setCommonState('projects.json', json))
    .catch((error) => setCommonState('projects.error', error))
    .finally(() => setCommonState('projects.isLoading', false));
};

export default fetchProjects;
