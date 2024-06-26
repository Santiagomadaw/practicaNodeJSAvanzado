import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import LoginPage from '../login/LoginPage';
import { Provider } from 'react-redux';
import {  authLogin } from '../../store/actions';
import userEvent from '@testing-library/user-event';

jest.mock('../../store/actions');

const userType = (input, text) => userEvent.type(input, text);
const userCheck = (input) => userEvent.click(input);


describe('LoginPage', () => {
  const state = { ui: { pending: false, error: null } };
  const store = {
    dispatch: () => { },
    getState: () => state,
    subscribe: () => { },
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

  test('Snap shot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch authLogin action ', () => {
    const email = 'email';
    const password = 'password';
    const save = false
    renderComponent();

    const usernameInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const saveInput = screen.getByRole('checkbox');
    
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();

    act(() => userType(usernameInput, email));
    act(() => userType(passwordInput, password));
    if (save) { act(() => userCheck(saveInput))}


    expect(submitButton).toBeEnabled();

    userEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password, save });

  });
});

