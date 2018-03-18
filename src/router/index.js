import Vue from 'vue'
import Router from 'vue-router'
import MusicHome from '../view/MusicHome.vue';
import MusicPlayer from '../view/MusicPlayer.vue';
import MusicPlayList from '../view/MusicPlayList.vue';
import MusicAlbum from '../view/MusicAlbum.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MusicHome
    },
    {
      path: '/player',
      name: 'player',
      component: MusicPlayer
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: MusicPlayList
    },
    {
      path: '/album',
      name: 'album',
      component: MusicAlbum
    }
  ]
})
