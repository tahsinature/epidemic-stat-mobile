import actionTypes from '../constants/actionTypes';

const initialState = {
  result: null,
  isResultLoading: true,
  selectedCountry: 'Worldwide',
};

const homeReducer = (state = initialState, action) => {
  if (action.type === actionTypes.homeReducer.WILL_LOAD_STAT) return {...state, result: null, isResultLoading: true};
  if (action.type === actionTypes.homeReducer.LOAD_STAT) return {...state, result: action.payload.result, isResultLoading: false, selectedCountry: action.payload.selectedCountry};
  if (action.type === actionTypes.homeReducer.LOAD_STAT_FAILED) return {...state, result: null, isResultLoading: false};
  else return state;
};

export default homeReducer;
