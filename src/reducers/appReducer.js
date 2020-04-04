import actionTypes from '../constants/actionTypes';
import _ from 'lodash';

const initialState = {
  supportedCountries: [],
  isManifestLoading: true,
  isManifestLoaded: false,
  isFetchingData: false,
  dataFetchError: {
    isError: false,
    retryAction: null,
  },

  snackBar: {
    show: true,
    msg: 'Something is really wrong...',
  },
  applicationUpdate: {},
};

const appReducer = (state = initialState, action) => {
  if (action.type === actionTypes.appReducer.APP_BOOTUP_SUCCESS) {
    return {
      ...state,
      supportedCountries: action.payload.countryList,
      isManifestLoading: false,
      isManifestLoaded: true,
      applicationUpdate: action.payload.applicationUpdate,
      dataFetchError: {...state.dataFetchError, isError: false},
    };
  } else if (action.type === actionTypes.appReducer.APP_BOOTUP_FAILED) return {...state, isManifestLoading: false, isFetchingData: false, dataFetchError: {...state.dataFetchError, isError: true}};
  else if (action.type === actionTypes.appReducer.LOAD_BOOT_STAGE) return {...state, isManifestLoading: true};
  else if (action.type === actionTypes.appReducer.START_NETWORK_CALL) return {...state, isFetchingData: true};
  else if (action.type === actionTypes.appReducer.STOP_NETWORK_CALL) return {...state, isFetchingData: false, dataFetchError: {...state.dataFetchError, isError: false}};
  else if (action.type === actionTypes.appReducer.DATA_FETCH_ERROR)
    return {...state, isFetchingData: false, dataFetchError: {...state.dataFetchError, isError: true, retryAction: _.get(action, 'payload.retryAction', null)}};
  else if (action.type === actionTypes.appReducer.SHOW_SNACKBAR) return {...state, snackBar: {...state.snackBar, show: true, msg: action.payload.msg}};
  else if (action.type === actionTypes.appReducer.HIDE_SNACKBAR) return {...state, snackBar: {...state.snackBar, show: false}};
  else if (action.type === actionTypes.appReducer.SKIP_UPDATE) return {...state, applicationUpdate: {...state.applicationUpdate, hasAppUpdate: false}};
  else return state;
};

export default appReducer;
