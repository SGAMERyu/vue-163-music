<template>
  <div class="row" :style="style" :class="classList">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SgRow',
    props: {
      gutter: Number,
      justify: {
        type: String,
        default: 'start'
      },
      align: {
        type: String,
        default: 'start'
      }
    },
    computed:{
      style(){
        let ret = {};
        if(this.gutter){
          ret.marginLeft = `-${this.gutter / 2}px`;
          ret.marginRight = `-${this.gutter / 2}px`;
        }
        return ret;
      },
      classList(){
        let classList = ['justify', 'align'].map( props => this[props] ? `flex-${props}-${this[props]}`: '');
        return classList;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
</style>
