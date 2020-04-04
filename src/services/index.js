import {mainServerAdapter} from './axiosAdapter';

export const mainServices = {
  getManifest: async () => {
    const response = await mainServerAdapter.get('/manifest');
    return response.data.data;
  },
  getDataByCountry: async countryName => {
    const response = await mainServerAdapter.get(`/stat/?country=${countryName}`);
    return response.data.data;
  },
};
