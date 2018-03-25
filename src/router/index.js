import Vue from 'vue'
import Router from 'vue-router'
import MusicHome from '../view/MusicHome.vue';
import MusicPlayer from '../view/MusicPlayer.vue';
import DetailPlayList from '../view/DetailPlayList.vue';
import DetailAlbum from '../view/DetailAlbum.vue';
import DetailSong from '../view/DetailSong.vue';
import DetailArtist from '../view/DetailArtist.vue'
import MusicPlayLists from '../view/MusicPlayLists.vue';
import MusicAlbumLists from '../view/MusicAlbum.vue';
import MusicArtists from '../view/MusicArtistList.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MusicHome,
    },
    {
      path: '/player',
      name: 'player',
      component: MusicPlayer
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: DetailPlayList
    },
    {
      path: '/album',
      name: 'album',
      component: DetailAlbum
    },
    {
      path: '/artist',
      name: 'artist',
      component: DetailArtist
    },
    {
      path: '/song',
      name: 'song',
      component: DetailSong 
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: MusicPlayLists
    },
    {
      path: '/albumlists',
      name: 'albumlists',
      component: MusicAlbumLists
    },
    {
      path: '/artistlists',
      name: 'artistlists',
      component: MusicArtists
    }
  ]
})
