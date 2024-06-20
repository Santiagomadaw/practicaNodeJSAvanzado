import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import LoginPage from '../login/LoginPage';
import { Provider } from 'react-redux';
import { adCreate, authLogin } from '../../store/actions';
import userEvent from '@testing-library/user-event';
import NewAdvertPage from '../NewAdvertPage/NewAdvertPage';
import { BrowserRouter } from 'react-router-dom';
import { defaultState } from '../../store/reducers';

jest.mock('../../store/actions');

const userType = (input, text) => userEvent.type(input, text);
const userSelect = (input, options) => userEvent.selectOptions(input, options);
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
    renderComponent();

    const usernameInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    act(() => userType(usernameInput, email));
    act(() => userType(passwordInput, password));
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);
    expect(authLogin).toHaveBeenCalledWith({ email, password, save: false });


  });
});


describe('NewAdvertPage', () => {
  const state = {
    ...defaultState, tags: {
      loaded: true,
      data: [
        'lifestyle',
        'mobile',
        'motor',
        'work'
      ]
    }
  };
  const store = {
    dispatch: jest.fn(),
    getState: () => state,
    subscribe: () => { },
    location: location,
    navigate: jest.fn(),
    getTagsLoaded: () => state.tags,
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewAdvertPage />
        </BrowserRouter>
      </Provider>,
    );


  test('Snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch adCreate action', async () => {
    const name = 'name';
    const sale = true;
    const price = '100';
    const tags = 'work';

    renderComponent();

    const nameInput = screen.getByRole('name');
    const saleInput = screen.getByRole('checkbox');
    const priceInput = screen.getByRole('price');
    const tagsInput = screen.getByRole('tags');
    const submitButton = screen.getByRole('buttonSubmit');

    expect(submitButton).toBeDisabled();

    act(() => userType(nameInput, name));
    act(() => userCheck(saleInput, sale));
    act(() => userType(priceInput, price));
    act(() => userSelect(tagsInput, tags));

    expect(submitButton).toBeEnabled();

    userEvent.click(submitButton);

    expect(adCreate).toHaveBeenCalledWith({ name, sale, price, tags });
  });
});