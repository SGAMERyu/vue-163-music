<template>
  <div id="app">
    <div class="container">
      <m-menu></m-menu>
      <router-view></router-view>
    </div>
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
  overflow: hidden;
}
.container{
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.item{
  background: orange;
}
</style>
