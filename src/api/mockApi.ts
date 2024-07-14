import axios from 'axios';

const mockApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const submitPollData = (data: any) => mockApi.post('/posts', data);
