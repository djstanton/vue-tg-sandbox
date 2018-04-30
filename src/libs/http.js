import axios from 'axios';

export const HTTP = axios.create({
    method: 'GET',
    baseURL: 'https://djstanton.github.io/vue-tg-sandbox/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
