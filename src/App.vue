<template>
  <div id="app">
    <m-loading v-show="isLoading"></m-loading>
    <div class="container" v-show="!isLoading">
      <m-menu v-if="!player "></m-menu>
      <router-view></router-view>
      <m-play></m-play>
    </div>
  </div>
</template>

<script>
import menu from './components/Menu';
import play from './components/Play';
import loading from './components/Loading';

export default {
  name: 'App',
  data(){
    return {
      player: false
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.isLoading;
    }
  },
  watch: {
    '$route'(to, from){
      if(to.name === "player"){
        this.player = true
      }else{
        this.player = false;
      }
    }
  },
  components: {
    'm-menu': menu,
    'm-play': play,
    'm-loading': loading
  }
}
</script>

<style lang="scss">
@import './package/reboot/reboot.scss';
body{
  min-width: 982px;
  background-color: #f5f5f5;
}
.item{
  background: orange;
}
</style>
