import { getMusicDetail, getMuscicLyric, getMusicUrl} from '../../api/api';

const music = {
  state: {
    tracks: [],
    lyric: []
  },
  mutations: {
    getTracks(state, { tracks }){
      state.tracks = tracks;
    },
    getLyric(state, { lyric }){
      state.lyric = lyric;
    }
  },
  actions: {
    async getMusicDetail({ commit, state }, detail){
      const { data: { playlist: { tracks } } } = await getMusicDetail(detail.id);
      commit('getTracks', { tracks })
    },
    async getMusciUrl({ commit, state }, music){
      const { data } = await getMusicUrl(music.id);
    },
    async getMuscicLyric({commit, state}, music){
      const { data: { lrc: { lyric } } } = await getMuscicLyric(music.id);
      commit('getLyric', { lyric });
    }, 
  }
}

export default music;