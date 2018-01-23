<template>
  <li :style="itemStyle" @mouseenter="handelMouseEnter" @mouseleave="handelMouseLeave">
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
        return this.rootMenu.gutter;
      },
      itemStyle(){
        let ret = {};
        if(this.active){
          ret.color = this.activeTextColor;
          ret.background = this.hoverBackground;
        }
        ret.color = this.textColor;
        ret.background = this.rootMenu.bg;
        ret.paddingLeft = ret.paddingRight = this.gutter;
        return ret;
      }
    },
    methods: {
      handelMouseEnter(){
        this.$el.style.background = this.hoverBackground;
        this.$el.style.color = this.activeTextColor;
      },
      handelMouseLeave(){
        this.$el.style.background = this.rootMenu.bg;
        this.$el.style.color = this.textColor;
      }
    }
  }
</script>
