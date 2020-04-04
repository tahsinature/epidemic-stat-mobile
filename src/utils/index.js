import {mainServices} from '../services';
import store from '../store';
import actionTypes from '../constants/actionTypes';

export const bootUp = () => {
  store.dispatch({type: actionTypes.appReducer.LOAD_BOOT_STAGE});
  mainServices
    .getManifest()
    .then(manifest => {
      const applicationUpdate = {hasAppUpdate: manifest.hasAppUpdate, isAppUpdateRequired: manifest.isAppUpdateRequired, updateLinks: manifest.updateLinks};
      store.dispatch({type: actionTypes.appReducer.APP_BOOTUP_SUCCESS, payload: {countryList: manifest.meta.supportedCountries, applicationUpdate}});
    })
    .catch(err => {
      store.dispatch({type: actionTypes.appReducer.APP_BOOTUP_FAILED, payload: {reason: 'test'}});
      // alert(err.message);
    });
};

export const loadStat = country => {
  if (!country) return alert('Please select a country first');
  store.dispatch({type: actionTypes.appReducer.START_NETWORK_CALL});
  mainServices
    .getDataByCountry(country)
    .then(stat => {
      store.dispatch({type: actionTypes.appReducer.STOP_NETWORK_CALL});
      const {confirmed, deaths, recovered} = stat[country];
      store.dispatch({type: actionTypes.homeReducer.LOAD_STAT, payload: {result: {country, infected: confirmed, death: deaths, recovered: recovered}, selectedCountry: country}});
    })
    .catch(err => {
      store.dispatch({type: actionTypes.appReducer.DATA_FETCH_ERROR, payload: {retryAction: () => loadStat(country)}});
      // alert(err.message);
    });
};

export const retryHomeResult = () => {
  console.log('retrying...');
};

export const showSnackbar = msg => {
  store.dispatch({type: actionTypes.appReducer.SHOW_SNACKBAR, payload: {msg}});
};

export const hideSnackbar = () => {
  store.dispatch({type: actionTypes.appReducer.HIDE_SNACKBAR});
};

export const skipUpdate = () => {
  store.dispatch({type: actionTypes.appReducer.SKIP_UPDATE});
};
