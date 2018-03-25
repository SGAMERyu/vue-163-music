<template>
  <div class="sg-pagination">
    <ul class="sg-pages">
      <li class="sg-page btn" v-show="currentCount > 1" @click="onPrev">上一页</li>
      <li class="sg-page" v-for="(count, index) in showCount" :key="index" :class="{active: count === currentCount}" @click="handleCurrentPage(count, index)">{{count}}</li>
      <li class="sg-page btn" v-show="currentCount < countSize" @click="onNext">下一页</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'sgPagination',
    data(){
      return {
        countSize: null,
        currentCount: 1,
        showCount: [],
      }
    },
    props: {
      total: Number,
      currentPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      pageCount: {
        type: Number,
        default: 7
      } 
    },
    computed:{
      totalSize(){
        return this.countSize > this.pageCount ? this.pageCount : this.countSize; 
      }
    },
    watch: {
      total(val){
        this.handlePageCount(val)
      },
      currentCount(val){
        this.handleShowCount(val);
        this.$emit('currentChange', (val - 1) * this.pageSize);
      },
    },
    methods: {
      handlePageCount(val){
        let count = Math.floor(val / this.pageSize);
        let remainder = val % this.pageSize;
        let index = 1;
        while(remainder > Math.pow(this.pageSize, index)){
          index++;
        } 
        this.countSize = count + index;
        this.handleShowCount();
        this.currentCount = this.currentPage;
      },
      handleShowCount(count){
        const length = this.showCount.length;
        const middleIndex = Math.floor(length / 2);
        const currentIndex = this.showCount.findIndex((item, index) => item === count);
        if(!length){
          this.showCount = Array.from({length: this.totalSize}, (count, index)=>{ return count = index + 1 });
        }else{
          if(currentIndex > middleIndex ){
            if(this.currentCount > this.countSize - middleIndex){
              let size = this.countSize;
              this.showCount = this.showCount.map(item => item = size--).reverse();
            }else{
              let diff = currentIndex - middleIndex;
              this.showCount = this.showCount.map(item => item + diff);
            }
          }else{
            if(this.currentCount < middleIndex + 1){
              let size = this.currentPage;
              this.showCount = this.showCount.map(item => item = size++)
            }else{
              let diff = middleIndex - currentIndex;
              this.showCount = this.showCount.map(item => item - diff);
            }
          }
        }
      },
      handleCurrentPage(count){
        this.currentCount = count;
      },
      onPrev(){
        this.currentCount--; 
      },
      onNext(){
        this.currentCount++;
      }
    },
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
      cursor: pointer;
    }
    & .active{
      border: none;
    }
    & .btn{
      border-radius: 20px;
    }
  }
</style>
