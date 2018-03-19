<template>
  <div class="m-player">
    <sg-row>
      <sg-col :col="19" :offset="2">
        <sg-row>
          <sg-col :col="14">
            <ul class="player-list">
              <li>收藏</li>
              <li>添加</li>
              <li>下载</li>
              <li>删除</li>
              <li>清空列表</li>
            </ul>
            <ul class="player-tracks scroll">
              <li class="track-item">
                <input type="checkbox" id="check-all" v-model="allList">
                <label class="item-edit" for="check-all"></label>
                <span class="item-name">歌曲</span>
                <span class="item-author">歌手</span>
                <span class="item-time">时长</span>
              </li>
              <li class="track-item" v-for="(track, index) in playTracks" :key="index">
                <input type="checkbox" :id="index" v-model="songList" :value="track">
                <label class="item-edit" :for='index'></label>
                <span class="item-name">{{track.name}}</span>
                <span class="item-author">{{track.ar[0].name}}</span>
                <div class="item-meta">
                  <span class="far fa-play-circle" v-show="!isPlay || index !== playIndex" @click="handlePlay(index)"></span>
                  <span class="far fa-pause-circle" v-show="isPlay && index === playIndex" @click="handlePlay(index)"></span>
                  <span class="fas fa-plus"></span>
                  <span class="far fa-trash-alt"></span>
                  <span class="far fa"></span>
                </div>
              </li>
            </ul>
          </sg-col>
          <sg-col :col="8" :offset="2">
            <div class="player-lyric scroll" ref="lyric">
              <p v-for="(lyric, index) in songLyric" :key="index" :class="{light: index === lightIndex}">{{lyric[1]}}</p>
            </div>
          </sg-col>
        </sg-row>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';

  export default {
    name: 'player',
    data(){
      return {
        allList: false,
        songList: [],
        songLyric: [],
        lightIndex: 0,
      }
    },
    computed: {
      isPlay: {
        get(){
          return this.$store.state.music.isPlay
        },
        set(value){
          this.$store.commit('setPlay', value); 
        }
      },
      playIndex: {
        get(){
          return this.$store.state.music.playIndex
        },
        set(value){
          this.$store.commit('setIndex', value); 
        }
      },
      playTime(){
        return this.$store.state.music.playTime;
      },
      playTracks(){
        return this.$store.state.music.tracks;
      },
    },
    watch: {
      allList(val){
        if(val){
          this.songList = this.playTracks;
        }else{
          this.songList = [];
        }
      },
      playIndex(index){
        this.$refs.lyric.scrollTop = 0;
        this.getMusicLyric(index)
      },
      playTime(val){
         this.lightIndex = this.songLyric.findIndex((lyric, index)=>{
          return parseFloat(lyric[0].toFixed(3)) <= parseFloat(val.toFixed(3)) && parseFloat(val.toFixed(3)) <= parseFloat(this.songLyric[index + 1][0].toFixed(3));
       })
      },
      lightIndex(val){
        if(val < 4) return;
        this.$refs.lyric.scrollTop = (val - 4) * 32;
      }
    },
    methods: {
      handlePlay(index){
        this.playIndex = index  
        this.isPlay = !this.isPlay;
      },
      async getMusicLyric(index){
        const { id } = this.playTracks[index];
        const { data: { lrc: { lyric } } } = await api.getLyric$id(id);
        this.songLyric = this.coverLyric(lyric);
      },
      coverLyric(lyric){
        let pattern = /\[\d{2}:\d{2}.\d+\]/g;
        let lines = lyric.split('\n');
        while(!pattern.test(lines[0])){
          lines = lines.slice(1);
        }
        lines.pop();
        return lines.map((line)=>{
          let [ times ] = line
                      .match(pattern)
                      .map((time)=>{
                        let [minute, second] = time.slice(1, -1).split(':');
                        return parseInt(minute, 10) * 60 + parseFloat(second); 
                      })
          let value = line.replace(pattern, "");
          return [times, value];
        })
      }
    },
    mounted(){
      this.getMusicLyric(this.playIndex);
    }
  }  
</script>

<style lang="scss">
  .light{
    color: red;
  }
  .m-player{
    width: 100%;
    height: 100vh;
    padding-top: 40px;
    background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);
    & .player-list{
      display: flex;
      justify-content: space-between;
      & li{
        min-width: 122px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        padding: 0 23px;
        line-height: 38px;
        margin-right: 6px;
      }
    }
    & .scroll{
      &::-webkit-scrollbar{
        width: 10px;
      }
      &::-webkit-scrollbar-thumb{
        background: #ccc;
        border-radius: 20px;
      }
      &::-webkit-scrollbar-track{
        background: transparent;
        border-radius: 20px;
      }
    }
    & .player-tracks{
      margin-top: 35px;
      height: 450px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      padding-right: 62px;
      & .track-item{
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items:  center;
        & input{
          display: none;
          &:checked + label{
            &::before{
              display: block;
              position: absolute;
              content: "\2714";
              width: 14px;
              height: 14px;
              line-height: 14px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
            }
          }
        }
        & .item-edit{
          font-size: 16px;
          width: 16px;
          height: 16px;
          border: 1px solid #ccc;
          margin-right: 62px;
          position: relative;
        }
        & .item-name{
          width: 40%;
          overflow: hidden;
        }
        & .item-author{
          width: 26%;
        }
        & .item-meta{
          width:20%;
          color: #fff;
          & span{
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
    & .player-lyric{
      margin-top: 75px;
      height: 400px;
      overflow-y: auto;
      text-align: center;
      & p {
        min-height: 32px;
        line-height: 32px;
        transition: all 0.2s ease-in;
      }
    }
  }
</style>

