<template>
  <div id="app">
    <m-menu></m-menu>
    <router-view></router-view>
    <m-play></m-play>
  </div>
</template>

<script>
import menu from './components/MusicMenu';
import play from './components/MusicPlay';

export default {
  name: 'App',
  components: {
    'm-menu': menu,
    'm-play': play
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
