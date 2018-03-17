import Vue from 'vue';
import Vuex from 'vuex';
import mutation from './mutation';
import music from './modules/music';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: true
  },
  mutations: {
    initData(state, value){
      state.isLoading = value;
    }
  },
  modules: {
    music, 
  }
})

export default store;