<template>
  <div :class="classList" :style="gutter">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SgCol',
    props: {
      col: {
        type: Number,
        default: 24,
      },
      offset: Number,
      order: Number,
    },
    computed: {
      classList(){
        let classList = ['col', 'offset', 'order'].map((props)=>{
          if(this[props]){
            return props !== 'col' ? `sg-${props}-${this[props]}` : `sg-col-${this[props]}`;
          }
        })
        return classList;
      },
      gutter(){
        let ret = {};
        let parent = this.$parent;
        while(parent && parent.$options.name !== 'SgRow'){
          parent = parent.$parent;
        }
        ret.paddingLeft = `${parent.gutter / 2}px`;
        ret.paddingRight = `${parent.gutter / 2}px`;
        return ret;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @for $i from 1 through 24{
    .sg-col-#{$i}{
      flex: 0 0 ($i / 24) * 100%;
      max-width: ($i / 24) * 100%;
    }
  }
  @for $i from 1 through 24{
    .sg-offset-#{$i}{
      margin-left: ($i / 24) * 100%;
    }
  }
  @for $i from 1 through 24{
    .sg-order-#{$i}{
      order: $i;
    }
  }
</style>
