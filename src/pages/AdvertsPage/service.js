import { client } from '../../utils/api/client';

const getAds = () => {
    try {
        return client.get('/api/v1/adverts');
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getAds;
