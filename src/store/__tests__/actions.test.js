import { adCreate, adCreatedFulfilled, adCreatedPending, adCreatedRejected, adDetailRejected, adsLoadedFulfilled, authLogin, authLogout, clearFilters, loginFulfilled, loginPending, loginRejected, logoutFulfilled, logoutPending, logoutRejected } from '../actions';
import { ADS_LOADED_FULFILLED, AD_DETAIL_REJECTED, AUTH_LOGIN_PENDING, CLEAR_FILTERS } from '../types';

// -------------- Test Sincrono ----------------


describe('authLoginPending', () => {
  test('should return an "AUTH_LOGIN_PENDING" action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_PENDING,
    };
    const action = loginPending();
    expect(action).toEqual(expectedAction);
  });
});

describe('adsLoadedFulfilled', () => {
  test('should return an "ADS_LOADED_FULFILLED" action', () => {
    const ads = 'LOADED ADS';
    const expectedAction = {
      type: ADS_LOADED_FULFILLED,
      payload: 'LOADED ADS'
    };
    const action = adsLoadedFulfilled(ads);
    expect(action).toEqual(expectedAction);
  });
});

describe('adDetailRejected', () => {
  test('should return an "AD_DETAIL_REJECTED" action', () => {
    const error = 'ERROR';
    const expectedAction = {
      type: AD_DETAIL_REJECTED,
      payload: 'ERROR',
      error: true,
    };
    const action = adDetailRejected(error);
    expect(action).toEqual(expectedAction);
  });
});

describe('clearFilters', () => {
  test('should return an "CLEAR_FILTERS" action', () => {
    const maxPrice = 100;
    const expectedAction = {
      type: CLEAR_FILTERS,
      payload: 100,
    };
    const action = clearFilters(maxPrice);
    expect(action).toEqual(expectedAction);
  });
});

// -------------- Test Asincrono ----------------

describe('authLogin action', () => {
  const credentials = 'credentials';
  const action = authLogin(credentials);
  const redirectUrl = 'redirectUrl';
  const dispatch = jest.fn();
  const services = { login: {} };
  const router = {
    state: { location: { state: { from: redirectUrl } } },
    navigate: jest.fn(),
  };

  test('Login Succesfull', async () => {

    services.login = jest.fn().mockResolvedValue();
    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, loginPending());
    expect(services.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, loginFulfilled());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl, {
      replace: true,
    });
    jest.resetAllMocks()
  });

  test('Login ReJected', async () => {
    const error = new Error('unauthorized');
    services.login = jest.fn().mockRejectedValue(error);

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, loginPending());
    expect(services.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, loginRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
    
  });
  jest.resetAllMocks()
});

describe('authLogout action', () => {
  const action = authLogout();
  const dispatch = jest.fn();
  const services = { logout: {} };
  

  test('Logout Succesfull', async () => {

    services.logout = jest.fn().mockResolvedValue();
    await action(dispatch, undefined, { services });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, logoutPending());
    expect(services.logout).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenNthCalledWith(2, logoutFulfilled());
    

    jest.resetAllMocks()
  });

  test('Logout ReJected', async () => {
    const error = new Error('unauthorized');
    services.logout = jest.fn().mockRejectedValue(error);

    await action(dispatch, undefined, { services });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, logoutPending());
    expect(services.logout).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenNthCalledWith(2, logoutRejected(error));
    
  });
  jest.resetAllMocks()
});
