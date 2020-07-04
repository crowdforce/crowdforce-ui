import { setCommonState } from 'use-common-state';

const fetchProject = ({ projectId }) => {
  setCommonState(['projects', projectId, 'isLoading'], true);
  window.fetch('api/project')
    .then((res) => res.json())
    .then((json) => setCommonState(['projects', projectId, 'json'], json))
    .catch((error) => setCommonState(['projects', projectId, 'error'], error))
    .finally(() => setCommonState(['projects', projectId, 'isLoading'], false));
};

export default fetchProject;
