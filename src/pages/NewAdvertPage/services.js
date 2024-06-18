import { client } from '../../utils/api/client';

export const postAd = async (formvalues) => {
    try {
        return await client.post('/api/v1/adverts', formvalues, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    } catch (error) {
        const msg = error.message;
        return Promise.reject({ message: msg });
    }
};

export const logout = () => {
    return Promise.resolve().then(() => {
        localStorage.removeItem('auth');
    });
};
