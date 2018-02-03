<template>
  <ul class="sg-breadcrumb">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'SgBreadcrumb',
    props: {
      separator: String,
      gutter: String
    },
  }
</script>

<style lang="scss">
  .sg-breadcrumb{
    display: flex;
    font-size: 14px;
    line-height: 1;
  }
</style>
