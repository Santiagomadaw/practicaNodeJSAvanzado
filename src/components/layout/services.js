import { client } from '../../utils/api/client';

export default function getTags() {
    return client.get('/api/v1/adverts/tags');
}
