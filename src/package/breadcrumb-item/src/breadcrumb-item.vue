<template>
  <li class="sg-breadcrumb-item" @click="handleRoute">
    <slot></slot>
    <span class="sg-breadcrumb-separator" :style="gutter">{{separator}}</span>
  </li>
</template>

<script>
  export default {
    name: 'SgBreadcrumbItem',
    props: {
      index: String
    },
    computed:{
      separator(){
        let result = "";
        if(this.$parent.$options.name === 'SgBreadcrumb'){
          result = this.$parent.separator;
        }
        return result;
      },
      gutter(){
        let ret = {};
        if(this.$parent.gutter){
          ret.paddingLeft = ret.paddingRight = `${this.$parent.gutter}px`;
        }
        return ret;
      }
    },
    methods:{
      handleRoute(){
        this.$router.push({name: this.index})
      }
    },
  }
</script>

<style lang="scss">
  .sg-breadcrumb-item{
    
    text-align: center;
    &:last-child .sg-breadcrumb-separator{
      display: none;
    }
  }
</style>
