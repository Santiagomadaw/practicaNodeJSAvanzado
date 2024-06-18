import {
  ADS_DELETED_FULFILLED,
  ADS_LOADED_FULFILLED,
  AD_CREATED_FULFILLED,
  AD_DETAIL_FULFILLED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGOUT,
  CLEAR_FILTERS,
  UI_RESET_ERROR,
  UPDATE_FILTER_BUYSELL,
  UPDATE_FILTER_PRICE,
  UPDATE_FILTER_SEARCH,
  UPDATE_FILTER_TAGS,
  UPDATE_SLIDER,
  UPDATE_TAGS_FULFILLED,
} from './types';


const defaultState = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
  },
  filters: {
    search: '',
    tags: [],
    buysell: 'all',
    price: [],
  },
  slider:
    [],
  ui: {
    pending: false,
    error: null,
  },
  tags: {
    data: [],
    loaded: false
  }
};
//----------------Login reducer--------------

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_FULFILLED:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}
//----------------Ads reducer--------------

export function ads(state = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED_FULFILLED:
      return { loaded: true, data: action.payload };
    case AD_DETAIL_FULFILLED:
      return { loaded: false, data: [action.payload, ...state.data] };
    case AD_CREATED_FULFILLED:
      return { ...state, data: [action.payload, ...state.data] };
    case ADS_DELETED_FULFILLED:
      return { ...state, data: state.data.filter(ad => ad.id !== action.payload) };
    default:
      return state;
  }
}




//----------------Filters reducer--------------


export function filters(state = defaultState.filters, action) {
  switch (action.type) {
    case UPDATE_FILTER_SEARCH:

      return { ...state, search: action.payload };
    case UPDATE_FILTER_TAGS:
      return { ...state, tags: action.payload };
    case UPDATE_FILTER_BUYSELL:
      return { ...state, buysell: action.payload };
    case UPDATE_FILTER_PRICE:
      return { ...state, price: action.payload };
    case CLEAR_FILTERS:
      return {
        search: '',
        tags: [],
        buysell: 'all',
        price: action.payload
      };

    default:
      return state;
  }
}
//----------------Slider reducer--------------

export function slider(state = defaultState.slider, action) {
  switch (action.type) {
    case UPDATE_SLIDER:
      return [0, action.payload];
    default:
      return state;
  }
}
//----------------TAGS reducer--------------

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case UPDATE_TAGS_FULFILLED:
      return { loaded: true, data: action.payload };
    default:
      return state;
  }
}




//----------------UI reducer--------------

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }
  if (action.type === UI_RESET_ERROR) {
    console.log(action.type)
    return { ...state, error: null };
  }
  if (action.type.endsWith('/pending')) {
    return { ...state, pending: true };
  }
  if (action.type.endsWith('/fulfilled')) {
    return { ...state, pending: false, error: null };
  }
  return state;
}
