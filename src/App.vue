<template>
  <div id="app">
    <!--<m-menu></m-menu>-->
    <router-view></router-view>
    <sg-slider v-model="value"></sg-slider>
  </div>
</template>

<script>
import menu from './components/MusicMenu';
import play from './components/MusicPlay';

export default {
  name: 'App',
  data(){
    return {
      value: 0
    }
  },
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
