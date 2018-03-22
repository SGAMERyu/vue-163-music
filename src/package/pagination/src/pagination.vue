<template>
  <div class="sg-pagination">
    <ul class="sg-pages">
      <li class="sg-page btn">上一页</li>
      <li class="sg-page active">1</li>
      <li class="sg-page">2</li>
      <li class="sg-page">3</li>
      <li class="sg-page btn">下一页</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'sgPagination',
    data(){
      return {
        showCount: 0
      }
    },
    props: {
      total: Number,
      currentPage: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 20
      },
      pageCount: {
        type: Number,
        daefault: 7
      } 
    },
    watch: {
      total(val){
        this.handlePageCount(val)
      }
    },
    methods: {
      handlePageCount(val){
        let count = Math.floor(val / this.pageSize);
        let remainder = val % this.pageSize;
        let index = 1;
        while(remainder > Math.pow(this.pageSize, index)){
          index++;
        } 
        console.log(count + index);
      }
    }
  }  
</script>

<style lang="scss">
  .sg-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .sg-pages{
    & .sg-page{
      display: inline-block;
      margin: 0 5px;
      padding: 6px 12px;
      border-radius: 50%;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #999;
    }
    & .active{
      border: none;
    }
    & .btn{
      border-radius: 20px;
    }
  }
</style>
