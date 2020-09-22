import { setCommonState } from 'use-common-state';
import ajax from '../utils/ajax';

const fetchProject = ({ projectId }) => {
  setCommonState(['projects', projectId, 'isLoading'], true);
  ajax(`/api/projects/${projectId}`)
    .then(({ data }) => setCommonState(['projects', projectId, 'data'], data))
    .catch((error) => setCommonState(['projects', projectId, 'error'], error))
    .finally(() => setCommonState(['projects', projectId, 'isLoading'], false));
};

export default fetchProject;
