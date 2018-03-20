import { api } from '../../api/api';
import { stat } from 'fs';

const music = {
  state: {
    tracks: [],
    playIndex: -1,
    playUrl: "",
    isPlay: false,
    playTime: '00 : 00',
  },
  mutations: {
    getTracks(state, tracks){
      state.tracks = tracks;
    },
    setIndex(state,  index ){
      state.playIndex = index;
    },
    setUrl(state, url){
      state.playUrl = url;
    },
    setPlay(state, value){
      state.isPlay = value;
    },
    setTime(state, value){
      state.playTime = value
    }
  },
  actions: {
    async getMusicDetail({ commit, state }, detail){
      const { data: { playlist: { tracks } } } = await api.getPlaylistDetail$id(detail.id);
      commit('getTracks', tracks)
    },
    async getAlbumDetail({ commit, state }, play){
      const { data: { songs }} = await api.getAlbum$id(play.id); 
      commit('getTracks', songs);
    },
    async getSongDetail({ commit, state }, play){
      const { data: { songs }} = await api.getSongDetail$ids(play.id);
      commit('getTracks', songs);
    },
    async getMusicUrl({ commit, state }, play){
      const { id } = state.tracks[state.playIndex];
      const { data: { data: [{ url }] } } = await api.getMusicUrl$id(id);
      commit('setUrl', url);
    },
  }
}

export default music;