import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3000`

export const getBanner = () => axios.get('/banner')
export const getHotList = () => axios.get('/top/playlist?limit=8&order=hot');
export const getAlbumList = () => axios.get(`/top/album?offset=0&limit=5`);
export const getTopList = (idx) => axios.get(`/top/list?idx=${idx}`)
export const getHomeTop = () => axios.all([getTopList(0), getTopList(1), getTopList(2)])
export const getArtistsList = () => axios.get(`/top/artists?offset=0&limit=5`);
export const getMusicDetail = (id) => axios.get(`/playlist/detail?id=${id}`)
export const getMusicUrl = (id) => axios.get(`/music/url?id=${id}`);
export const getMuscicLyric = (id) => axios.get(`/lyric?id=${id}`);
export const getAlbumDetail = (id) => axios.get(`/album?id=${id}`);
export const getSongDetail = (id) => axios.get(`/song/detail?ids=${id}`);