import { makeAutoObservable } from 'mobx';
import ajax from './ajax';

const apiRequests = {};
const apiStores = {};

class ApiStore {
  constructor(uri, options) {
    makeAutoObservable(this);
    this.uri = uri;
    this.options = options;
    this.key = JSON.stringify({ uri, ...options });
  }

  async fetch() {
    const { key } = this;

    if (apiRequests[key]) {
      return;
    }

    this.isLoading = true;

    try {
      apiRequests[key] = ajax(this.uri, this.options);
      const response = await apiRequests[key];

      const json = response.data;

      this.data = json;
      this.error = null;
      this.status = response.status;
    } catch (error) {
      this.data = null;
      this.error = error;
      this.status = 500;
    }

    this.isLoading = false;

    delete apiRequests[key];
  }

  key = null

  uri = null

  options = null

  status = null

  isLoading = false

  error = null

  data = null
}

const useApi = (uri, options) => {
  const key = JSON.stringify({ uri, ...options });

  if (!apiStores[key]) {
    apiStores[key] = new ApiStore(uri, options);
  }

  return apiStores[key];
};

export default useApi;
