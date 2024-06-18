import axios from 'axios';

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const setAuthorizationHeader = (token) =>
    (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
    delete client.defaults.headers.common['Authorization'];
};
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            //Server error
            return Promise.reject({
                message: error.response.statusText,
                ...error.response,
                ...error.response.data,
            });
        }
        // Request error
        return Promise.reject({ message: error.message });
    },
);