<template>
  <div id="app">
    <div class="container">
      <sg-nav bg="#242424" justify="center" textColor="#ccc" gutter="0.5rem" activeTextColor="#fff" hoverBg="#000" height="70px">
        <sg-nav-item>link</sg-nav-item>
        <sg-nav-item>link</sg-nav-item>
        <sg-nav-item>link</sg-nav-item>
      </sg-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container{
  width: 100%;
  margin: 0 auto;
}
.item{
  background: orange;
}
</style>
