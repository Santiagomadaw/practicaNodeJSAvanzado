import { client } from '../../utils/api/client';

export const getAd = (id) => {
    let response = null;
    try {
        response = client.get(`/api/v1/adverts/${id}`);
        return response;
    } catch (error) {
        const msg = error.message;
        return Promise.reject({ message: msg });
    }
};

export const deleteAd = (id) => {
    return client.delete(`/api/v1/adverts/${id}`);
};