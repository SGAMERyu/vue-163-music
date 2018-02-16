import Vue from 'vue'
import Router from 'vue-router'
import MusicHome from '../view/MusicHome.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MusicHome
    },
  ]
})
