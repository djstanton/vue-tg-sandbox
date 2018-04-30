import axios from 'axios';

export const HTTP = axios.create({
    method: 'GET',
    baseURL: '/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
