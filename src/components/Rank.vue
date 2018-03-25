<template>
  <sg-row :gutter="15">
    <sg-col :col="18">
      <div class="rank-nav">
        <router-link to="playlist" class="rank-title">
          <span><i class="fas fa-dot-circle"></i></span>
          热门推荐
          </router-link>
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
        <m-playlist :playData="hotLists" v-on:setTracks="handlePlayList"></m-playlist>
      </div>
      <div class="rank-nav">
        <router-link to="album" class="rank-title">
          <span><i class="fas fa-dot-circle"></i></span>
          新碟上架
        </router-link>
        <router-link to="album" class="rank-more">更多</router-link>
      </div>
      <div class="rank-area">
        <m-albumlist :albumlist="albumLists" v-on:setTracks="handlePlay"></m-albumlist>
      </div>
      <div class="rank-nav">
        <router-link to="toplist" class="rank-title">
          <span><i class="fas fa-dot-circle"></i></span>
          榜单
        </router-link>
        <router-link to="toplist" class="rank-more">更多</router-link>
      </div>
      <div class="rank-area">
        <div v-for="(top, index) in topLists" :key="index" class="rank-top">
          <div class="top-meta">
            <img :src="top.coverImgUrl" alt="" srcset="">
            <div class="top-desc">
              <span>{{top.name}}</span>
              <div class="top-btn">
                <span @click="handleAllSong(index)"><i class="far fa-play-circle fa-lg"></i></span>
                <span><i class="far fa-folder fa-lg"></i></span>
              </div>
            </div>
          </div>
          <ul class="top-list" type="1">
            <li v-for="(track, index) in topList[index]" :key="index" @click.stop="handleDetail(track)">
              <span class="list-type" :class="{'top': index + 1 <= 3}">{{index + 1}}</span>
              <span class="list-name">{{track.name}}</span>
              <div class="oper">
                <span @click="handleSong(track)"><i class="far fa-play-circle fa-lg"></i></span>
                <span><i class="fas fa-plus fa-lg"></i></span>
                <span><i class="far fa-folder fa-lg"></i></span>
              </div>
            </li>
            <li><span class="bottom">查看全部></span></li>
          </ul>
        </div>
      </div>
    </sg-col>
    <sg-col :col="6">
      <m-slidebar title="热门歌单" :slideData="playLists"></m-slidebar>
    </sg-col>
  </sg-row>
</template>

<script>
import { api } from '../api/api';
import { mapState } from 'vuex';
import playlist from './playlist';
import albumlist from './alubumlist';
import slidebar from './sliderBar';

  export default {
    name: 'm-rank',
    props: ['homeData', 'topLists'],  
    components: {
      'm-playlist': playlist,
      'm-albumlist': albumlist,
      'm-slidebar': slidebar
    },
    data(){
      return {
        hotLists: [],
        albumLists: [],
        playLists: [],
      }
    },
    computed: {
      topList(){
        let tracks = [];
        this.topLists.forEach((top, index) => {
          let arr = top.tracks.slice(0, 10);
          tracks.push(arr)
        })
        return tracks;
      },
    },
    watch: {
      homeData(val){
        [
          { data: { result: this.hotLists } }, 
          { data: { albums: this.albumLists} }, 
          { data: { playlists: this.playLists } }
        ] = val;
      }
    },
    methods: {
      handlePlayList(playlist){
        this.$store.dispatch('getMusicDetail', playlist);
      },
      handlePlay(play){
        this.$store.dispatch('getAlbumDetail', play);
      },
      handleSong(play){
        this.$store.dispatch('getSongDetail', play);
      },
      handleAllSong(index){
        this.$store.commit('getTracks', this.topLists[index].tracks);  
      },
      handleDetail(song){
        this.$router.push({name: 'song', query: { id: song.id }});
      }
    },
  }
</script>

<style lang="scss">
  .rank-nav{
    display: flex;
    height: 33px;
    line-height: 33px;
    border-bottom: 2px solid #C10D0C;
    & .rank-meta{
      height: 33px;
      line-height: 33px;
    }
    &.singed{
      font-size: 12px;
      border-bottom: 1px solid #ccc;
      & .rank-more{
        color: #666;
      }
    }
  }
  .rank-title{
    color: #000000;
    font-size: 20px;
    line-height: 28px;
    margin-right: 10px;
    & span{
      color: #c10d0c;
    }
  }
  .rank-more{
    margin-left: auto;
  }
  .rank-area{
    margin-top: 20px;
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
  }
  .rank-top{
    flex: 1 0 auto;
    background: #f4f4f4;
    border: 1px solid #d3d3d3;
    & .top-meta{
      height: 120px;
      padding: 20px 0 20px 19px;
      & img{
        max-width: 100%;
        max-height: 100%;
        float: left;
      }
      & .top-desc{
        width: 116px;
        float: left;
        margin: 6px 0 0 10px;
        font-size: 14px;
        color: #333;
        & .top-btn{
          display: block;
          margin-top: 10px;
          color: #bfbfbf;
          & span {
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
    & .top-list{
      line-height: 32px;
      font-size: 12px;
      & .list-type{
        margin-left: 15px;
        width: 35px;
        height: 32px;
        display: inline-block;
        text-align: center;
        font-size: 16px;
        color: #666;
      }
      & .top{
        color: #c10d0c;
      }
      & .bottom{
        margin-left: auto;
        margin-right: 30px;
      }
      & .oper{
        display: none;
        margin-left: auto;
        margin-right: 10px;
        color: #666;
        & span{
          margin-right: 10px;
        }
      }
      & .list-name{
        width: 176px;
        height: 32px;
        overflow: hidden;
      }
      & li {
        display: flex;
        height: 32px;
        cursor: pointer;
        &:nth-of-type(odd){
          background: #e8e8e8;
        }
        &:hover{
          & .oper{
            display: block;
          }
          & .list-name{
            width: 76px;
          }
        }
      }
    }
  }
</style>

