import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3000`

export const getBanner = () => axios.get('/banner')
export const getHotList = () => axios.get('/top/playlist?limit=8&order=hot');
export const getAlbumList = () => axios.get(`/top/album?offset=0&limit=5`);
export const getTopList = (idx) => axios.get(`/top/list?idx=${idx}`)
export const getHomeTop = () => axios.all([getTopList(0), getTopList(1), getTopList(2)])
export const getArtistsList = () => axios.get(`/top/artists?offset=0&limit=5`);
