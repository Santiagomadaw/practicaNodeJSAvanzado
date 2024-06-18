import React from 'react';
import App from './App';
import './index.css';
import { setAuthorizationHeader } from './utils/api/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import configureStore from './store';
import { Provider } from 'react-redux';

const accessToken = localStorage.getItem('auth');
if (accessToken) {
    setAuthorizationHeader(accessToken);
}
const router = createBrowserRouter([{ path: '*', element: <App />}]);

const store = configureStore({ auth: !!accessToken}, {router});
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router = {router}/>
        </Provider>
    </React.StrictMode>
);
