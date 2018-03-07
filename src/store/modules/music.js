import { getMusicDetail, getMuscicLyric, getMusicUrl, getAlbumDetail, getSongDetail} from '../../api/api';

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
      const { data: { playlist: { tracks } } } = await getMusicDetail(detail.id);
      commit('getTracks', tracks)
    },
    async getAlbumDetail({ commit, state }, play){
      const { data: { songs }} = await getAlbumDetail(play.id); 
      commit('getTracks', songs);
    },
    async getMuscicLyric({commit, state}, music){
      const { data: { lrc: { lyric } } } = await getMuscicLyric(music.id);
      commit('getLyric', { lyric });
    }, 
    async getSongDetail({ commit, state }, play){
      const { data: { songs }} = await getSongDetail(play.id);
      commit('getTracks', songs);
    }
  }
}

export default music;