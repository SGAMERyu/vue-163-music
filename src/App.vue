<template>
  <div id="app">
    <m-menu></m-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from './components/MusicMenu';

export default {
  name: 'App',
  components: {
    'm-menu': menu
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
