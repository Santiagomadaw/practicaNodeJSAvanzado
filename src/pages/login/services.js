import {
    client,
    setAuthorizationHeader,
    removeAuthorizationHeader,
} from '../../utils/api/client';

export const login = async (formvalues) => {
    const { email, password } = formvalues;
    try {
        const response = await client.post('/api/auth/login', {
            email,
            password,
        });
        const { accessToken } = response.data;

        setAuthorizationHeader(accessToken);
        if (formvalues.save) {
            localStorage.setItem('auth', accessToken);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logout = () => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader();
        localStorage.removeItem('auth');
    });
};
