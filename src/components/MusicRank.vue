<template>
  <sg-row :gutter="15">
    <sg-col :col="18">
      <div class="home-rank-nav">
        <router-link to="playlist" class="rank-title">热门推荐</router-link>
        <sg-breadcrumb separator="|" gutter="10" class="rank-meta">
          <sg-breadcrumb-item>华语</sg-breadcrumb-item>
          <sg-breadcrumb-item>流行</sg-breadcrumb-item>
          <sg-breadcrumb-item>摇滚</sg-breadcrumb-item>
          <sg-breadcrumb-item>民谣</sg-breadcrumb-item>
          <sg-breadcrumb-item>电子</sg-breadcrumb-item>
        </sg-breadcrumb>
        <router-link to="playlist" class="rank-more">更多</router-link>
      </div>
      <div class="rank-area">
        <div v-for="(hot, index) in hotList" :key="index" class="rank-hot">
          <div class="hot-meta">
            <img :src="hot.coverImgUrl" alt="" srcset="">
            <div class="hot-meta-bottom">{{hot.playCount}}</div>
          </div>
          <div class="hot-bottom">
            <p>{{hot.name}}</p>
          </div>
        </div>
      </div>
    </sg-col>
    <sg-col :col="6">123</sg-col>
  </sg-row>
</template>

<script>
import { getHotList } from '../api/api';

  export default {
    name: 'm-rank',
    data(){
      return {
        hotList: [],
      }
    },
    methods: {
      getHotList(){
        getHotList()
        .then(result => this.hotList = result.data.playlists);
      }
    },
    created(){
      this.getHotList();
    }
  }
</script>

<style lang="scss">
  .home-rank-nav{
    display: flex;
    height: 33px;
    line-height: 33px;
    border-bottom: 2px solid #C10D0C;
    & .rank-meta{
      height: 33px;
      line-height: 33px;
    }
  }
  .rank-title{
    color: #000000;
    font-size: 20px;
    line-height: 28px;
    margin-right: 10px;
  }
  .rank-more{
    margin-left: auto;
  }
  .rank-area{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .rank-hot{
    width: 140px;
    height: 204px;
    margin-right: 35px;
    & .hot-meta{
      width: 140px;
      height: 140px;
      position: relative;
      & img{
        max-width: 100%;
        max-height: 100%;
      }
      & .hot-meta-bottom{
        position: absolute;
        bottom: 0%;
        left: 0%;
        width: 100%;
        height: 27px;
        line-height: 27px;
        color: #ccc;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.5);
      }
    }
    & .hot-bottom{
      margin: 8px 0 3px;
      font-size: 14px;
    }
  }
</style>

