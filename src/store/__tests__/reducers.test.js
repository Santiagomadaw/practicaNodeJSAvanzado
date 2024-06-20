import { loginFulfilled, logoutFulfilled, tagsLoaderFulfilled, tagsLoaderRejected } from '../actions';
import { ads, auth, defaultState, filters, tags, ui } from '../reducers';

describe('auth', () => {
  test('should manage "AUTH_LOGIN_FULFILLED" action', () => {
    const state = defaultState.auth;
    const action = loginFulfilled();
    expect(auth(state, action)).toBe(true);
  });

  test('should manage "AUTH_LOGOUT_FULFILLED" action', () => {
    const state = defaultState.auth;
    const action = logoutFulfilled();
    expect(auth(state, action)).toBe(false);
  });





});
describe('tags', () => {

  test('should manage "UPDATE_TAGS_FULFILLED" action', () => {
    const state = defaultState.tags;
    const action = tagsLoaderFulfilled();
    expect(tags(state, action)).toEqual({ loaded: true, data: action.payload });
  });

  test('should manage "UPDATE_TAGS_REJECTED" action', () => {
    const state = defaultState.ui;
    const action = tagsLoaderRejected();
    expect(ui(state, action)).toEqual({ ...state, pending: false, error: action.payload });
  });
});
describe('others', () => {

  test('should manage "INIT" action in auth', () => {
    const state = defaultState.auth;
    const action = { type: 'INIT' };
    expect(auth(state, action)).toBe(state);
  });
  test('should manage undefined action in ads', () => {
    const state = defaultState.ads;
    const action = { type: undefined };
    expect(ads(state, action)).toBe(state);
  });
  test('should manage null action in filters', () => {
    const state = defaultState.filters;
    const action = { type: null };
    expect(filters(state, action)).toBe(state);
  });
});