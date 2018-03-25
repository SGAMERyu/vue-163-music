<template>
  <div class="songlist-main">
    <div class="songlist-title">
      <h3>包含歌曲列表</h3>
      <span class="songlist-count">{{songList.length}}首歌</span>
    </div>
    <ul class="songlist-header">
      <li class="songlist-name" :class="{isPlaylist: $route.name !== 'album'}">歌曲标题</li>
      <li class="songlist-author">歌手</li>
      <li class="songlist-album" v-if="$route.name !== 'album'">专辑</li>
      <li class="songlist-time">时长</li>
    </ul>
    <ul class="songlist-list">
      <li v-for="(song, index) in songList" :key="index">
        <div class="songlist-number">{{index}}</div>
        <div class="songlist-name" :class="{isPlaylist: $route.name !== 'album'}">{{song.name}}</div>
        <div class="songlist-menu">
          <span class="far fa-play-circle fa-lg" @click="setTracks(song)"></span>
          <span class="fas fa-plus"></span>
          <span class="fas fa-download"></span>
        </div>
        <div class="songlist-author">{{song.author}}</div>
        <div class="songlist-album" v-if="$route.name !== 'album'">{{song.album}}</div>
        <div class="songlist-time">{{song.dt}}</div>
        <div></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'detailSong',
    props: ['songData'],
    data(){
      return {
        songList: []
      }
    },
    watch:{
      songData(songs){
        this.songList = songs.map((song) => {
          song.author = song['ar'][0].name;
          song.album = song['al'].name;
          song.dt = this.coverTime(song.dt);
          return song;
        }) 
      }
    },
    methods: {
      coverTime(time){
        let minute = Math.floor((time % 36000000) / 60000);
        let second = Math.floor((time % 60000) / 1000 ) ;
        minute = minute >= 10 ? minute : `0${minute}`;
        second = second >= 10 ? second : `0${second}`;
        return `${minute} : ${second}`;
      },
      setTracks(song){
        this.$store.commit('getTracks', [ song ]);
      }
    }
  }  
</script>

<style lang="scss">
  .isPlaylist{
    width: 54% !important;
  }
  .songlist-main{
    margin-top: 27px;
    & .songlist-title{
      display: flex;
      align-items: center;
      height: 35px;
      line-height: 35px;
      border-bottom: 2px solid #c20c0c;
      & h3{
        font-size: 20px;
        font-weight: normal;
      }
      & .songlist-count{
        color: #666;
        margin-left: 20px;
        font-size: 12px;
      }
    }
    & .songlist-header{
      display: flex;
      padding: 0 30px;
      height: 50px;
      line-height: 50px;
      background: #f7f7f7;
      color: #999;
      font-size: 14px;
      & .songlist-name{
        width: 74%;
      }
      & .songlist-author{
        width: 20%;
      }
      & .songlist-album{
        width: 20%;
      }
      & .songlist-time{
        width: 50px;
      }
    }
    & .songlist-list{
      & li {
        display: flex;
        height: 50px;
        line-height: 50px;
        padding: 0 30px;
        position: relative;
        color: #999;
        font-size: 14px;
        &:hover{
          & .songlist-menu{
            display: block;
          }
          & .songlist-name{
            width: calc(74% - 200px);
          }
          & .isPlaylist{
            width: calc(54% - 200px) !important;
          }
        }
        &:nth-of-type(even){
          background: #f7f7f7;
        }
        & .songlist-number{
          position: absolute;
          top: 0;
          left: 5px;
          width: 30px;
        }
        & .songlist-name{
          width: 74%;
        }
        & .songlist-menu{
          width: 200px;
          color: #a2a2a2;
          display: none;
          & span {
            display: inline-block;
            margin-right: 10px;
          }
        }
        & .songlist-author{
          width: 20%;
        }
        & .songlist-album{
          width: 20%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & .songlist-time{
          width: 50px;
          font-size: 14px;
        }
      }
    }
  }
</style>
