<template>
  <li class="sg-nav-item" :style="[gutter, itemStyle]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'SgNavItem',
    inject: ['rootMenu'],
    props: {
      index: String
    },
    computed:{
      active(){
        return this.index === this.rootMenu.activeIndex;
      },
      textColor(){
        return this.rootMenu.textColor;
      },
      hoverBackground(){
        return this.rootMenu.hoverBg;
      },
      activeTextColor(){
        return this.rootMenu.activeTextColor;
      },
      gutter(){
        let gutter = {};
        gutter.paddingLeft = gutter.paddingRight = this.rootMenu.gutter;
        return gutter;
      },
      itemStyle(){
        let ret = {};
        if(this.active){
          ret.color = this.activeTextColor;
          ret.background = this.hoverBackground;
        }else{
          ret.color = this.textColor;
          ret.background = this.rootMenu.bg;
        }
        return ret;
      }
    },
    methods: {
      handleMouseEnter(){
        this.$el.style.background = this.hoverBackground;
        this.$el.style.color = this.activeTextColor;
      },
      handleMouseLeave(){
        if(this.active) return;
        this.$el.style.background = this.rootMenu.bg;
        this.$el.style.color = this.textColor;
      },
      handleClick(){
        this.$parent.handleItemClick(this.index);
      }
    }
  }
</script>

<style lang="scss">
  .sg-nav-item{
    flex: 0 0 auto;
  }
</style>
