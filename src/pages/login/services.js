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
        const msg = error.message;
        return Promise.reject({ message: msg });
    }
};

export const logout = () => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader();
        localStorage.removeItem('auth');
    });
};
