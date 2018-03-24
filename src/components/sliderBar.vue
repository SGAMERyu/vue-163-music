<template>
  <div class="slidebar-main">
    <h3>{{title}}</h3>
    <ul>
      <li class="slidebar-list" v-for="(item, index) in slideData" :key="index" @click="handleDetail(item)">
        <img class="slidebar-img" :src="item.coverImgUrl" alt="">
        <div class="slidebar-info">
          <p class="slidebar-meta">{{item.name}}</p>
          <p class="slidebar-meta">by: {{item.creator.nickname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'slidebar',
    props: ['title', 'slideData'],
    methods: {
      handleDetail(item){
         this.$router.push({name: 'playlist', query: { id: item.id }});
      }
    }
  }
</script>

<style lang="scss">
  .slidebar-main{
    background: #fff;
    & h3{
      font-size: 16px;
      font-weight: normal;
      height: 33px;
      line-height: 33px;
    }
    & .slidebar-list{
      display: flex;
      width: 200px;
      height: 50px;
      line-height: 24px;
      font-size: 12px;
      margin-top: 25px;
      cursor: pointer;
      & .slidebar-img{
        max-width: 50px;
        max-height: 50px;
      }
      & .slidebar-info{
        margin-left: 15px;
        line-height: 24px;
        & .slidebar-meta{
          width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
