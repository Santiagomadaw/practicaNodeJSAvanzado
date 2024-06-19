import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import * as reducers from './reducers';
import * as actionCreators from './actions';
import { withExtraArgument } from 'redux-thunk';
import getAds from '../pages/AdvertsPage/service';
import { findHighestPrice } from '../pages/AdvertsPage/utils';
import { login, logout } from '../pages/login/services';
import { postAd } from '../pages/NewAdvertPage/services';
import { deleteAd, getAd } from '../pages/AdvertPage/service';
import getTags from '../components/layout/services';

const reducer = combineReducers(reducers);

// eslint-disable-next-line no-unused-vars
const failureRedirects = (router, pathMap) => store =>next => action =>{
  
        const result = next(action);
        if (!action.error) {
          return result;
        }
        const redirect = pathMap[action.payload.status];
        if (redirect) {
          router.navigate(redirect);
        }
        return result;
      };
    
const composeEnhancers = composeWithDevTools({ actionCreators });
const services={ getAds, login, logout, postAd, deleteAd, getAd, getTags }
export default function configureStore(preloadedState, { router }) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        withExtraArgument({ services,findHighestPrice, router }),
        failureRedirects(router, {
          401: '/login',
          404: '/404',
        }),
      ),
    ),
  );

  return store;
}