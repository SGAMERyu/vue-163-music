<template>
  <ul class="sg-nav" :class="classList" :style="{ background: bg || ''}">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'SgNav',
    data(){
      return {
        activeIndex: this.defaultActive
      }
    },
    provide(){
      return {
        rootMenu: this
      }
    },
    props: {
      bg: String,
      hoverBg: String,
      defaultActive: {
        type: String,
        default: ''
      },
      justify: {
        type: String,
        default: "start"
      },
      vertical: {
        type: Boolean,
        default: false
      },
      textColor: String,
      activeTextColor: String,
      gutter: String,
    },
    computed: {
      classList(){
        let classList = [];
        this.vertical ? classList.push(`flex-direction-column`) : '';
        classList.push(`flex-justify-${this.justify}`);
        return classList;
      },
    },
    methods: {
      handleItemClick(index){
        this.activeIndex = index 
        this.$router.push({name: index})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-nav{
    display: flex;
  }
</style>

