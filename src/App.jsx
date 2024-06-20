import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/requireAuth';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Suspense, lazy } from 'react';
import { Loading } from './components/shared/Loading';
import NetworkError from './pages/NotFoundPage/NetworkError';
import Layout from './components/layout/Layout';
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const AdvertsPage = lazy(() => import('./pages/AdvertsPage/advertsPage'));
const NewAdvertPage = lazy(() => import('./pages/NewAdvertPage/NewAdvertPage'));
const AdvertPage = lazy(() => import('./pages/AdvertPage/advertPage'));
function App() {
    return (
        <Suspense fallback={<Loading />}>
            <>
            <Layout>
            
                <Routes>
                    <Route
                        path='/login'
                        element={<LoginPage />}
                    />
                    <Route
                        path='/adverts'
                        element={
                            <RequireAuth>
                                <div className='container'>
                                    <Outlet />
                                </div>
                            </RequireAuth>
                        }
                    >
                        <Route
                            index
                            element={<AdvertsPage />}
                        />
                        <Route
                            path=':adId'
                            element={<AdvertPage />}
                        />
                        <Route
                            path='new'
                            element={<NewAdvertPage />}
                        />
                    </Route>
                    <Route
                        path='/'
                        element={<Navigate to='/adverts' />}
                    />
                    <Route
                        path='/404'
                        element={<NotFoundPage />}
                    />
                    <Route
                        path='/error'
                        element={<NetworkError />}
                    />
                    <Route
                        path='*'
                        element={<Navigate to='/404' />}
                    />
                </Routes>
                </Layout>
            </>
        </Suspense>
    );
}

export default App;
