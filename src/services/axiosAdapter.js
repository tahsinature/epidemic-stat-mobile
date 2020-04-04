import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import pkg from '../../package.json';
import config from '../../config';

const meta = {
  appVersion: pkg.version,
  systemVersion: DeviceInfo.getSystemVersion(),
  model: DeviceInfo.getModel(),
};

export const mainServerAdapter = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'meta-data': JSON.stringify(meta),
  },
});
