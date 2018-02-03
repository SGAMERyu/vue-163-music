import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3000`

export const getBanner = () => axios.get('/banner')
export const getHotList = () => axios.get('/top/playlist?limit=8&order=hot');