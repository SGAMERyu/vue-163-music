import { api } from '../../api/api';

const music = {
  state: {
    tracks: [],
    lyric: [],
  },
  mutations: {
    getTracks(state, tracks){
      state.tracks = tracks;
    },
    getLyric(state, { lyric }){
      state.lyric = lyric;
    },
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
    async getMuscicLyric({commit, state}, music){
      const { data: { lrc: { lyric } } } = await getLyric$id(music.id);
      commit('getLyric', { lyric });
    }, 
    async getSongDetail({ commit, state }, play){
      const { data: { songs }} = await api.getSongDetail$ids(play.id);
      commit('getTracks', songs);
    }
  }
}

export default music;