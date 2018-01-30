<template>
  <div class="sg-carousel-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SgCarouselItem',
    created(){
      this.$parent.addItem(this);
    }
  }
</script>

<style lang="scss">
  .sg-carousel-item{
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: none;
  }
</style>


