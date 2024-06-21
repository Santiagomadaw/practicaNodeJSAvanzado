import { client } from '../../utils/api/client';

export const getAd = (id) => {
    let response = null;
    try {
        response = client.get(`/api/v1/adverts/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteAd = async (id) => {
    let response = null;

    try {
        response = await client.delete(`/api/v1/adverts/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};