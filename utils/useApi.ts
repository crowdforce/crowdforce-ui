import { AxiosRequestConfig } from 'axios';
import { action, observable } from 'mobx';
import ajax from './ajax';

const requests = {};
export const apiState = observable({});

export interface useApiInterface {
  fetch: () => Promise<void>,
  status: number,
  isLoading: boolean,
  error: any,
  data: any
}

const setState = action((key, value) => {
  apiState[key] = apiState[key] || {};
  Object.assign(apiState[key], value);
});

const useApi = (options?: AxiosRequestConfig): useApiInterface => {
  const key = JSON.stringify(options);

  return {
    fetch: async () => {
      if (requests[key]) {
        return;
      }

      setState(key, { isLoading: true });

      try {
        requests[key] = ajax(options);
        const {data, status} = await requests[key];
        setState(key, { data, error: null, status });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setState(key, { data: null, error: error.response.data, status: error.response.status });
        } else {
          // Something happened in setting up the request that triggered an Error
          setState(key, { data: null, error, status: 500 });
        }
      }

      setState(key, { isLoading: false });

      delete requests[key];
    },
    ...apiState[key],
  };
};

export default useApi;
