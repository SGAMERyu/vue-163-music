<template>
  <div class="m-play">
    <div class="play-btns">
      <span><i class="fas fa-step-backward fa-lg"></i></span>
      <span v-show="!isPlay" @click="isPlay = !isPlay"><i class="far fa-play-circle fa-lg"></i></span>
      <span v-show="isPlay" @click="isPlay = !isPlay"><i class="far fa-pause-circle fa-lg"></i></span>
      <span><i class="fas fa-step-forward fa-lg"></i></span>
    </div>
    <div class="play-head">
      <span v-show="!playPic" class="fas fa-music fa-lg"></span>
      <span v-show="playPic"><img :src="playPic"></span>
    </div>
    <div class="play-audio">
      <audio ref="musicAudio"></audio>
      <div class="play-meta">
        <span class="meta-name" v-show="alName">{{alName}}</span>
        <span class="meta-author" v-show="arName">{{arName}}</span>
      </div>
      <div class="play-slider">
        <sg-slider v-model="value" :gutter="0" :width="493"></sg-slider>
        <span class="play-time">00:00 / 00:00</span>
      </div>
    </div>
    <div class="play-control">
      <div class="play-volume" v-show="isVolume">
        <sg-slider :height="93" :width="4" :gutter="14" v-model="volume" vertical></sg-slider>
      </div>
      <span @click="isVolume = !isVolume"><i class="fas fa-volume-up fa-lg"></i></span>
      <span v-show="!isRandom" @click="isRandom = !isRandom"><i class="fas fa-retweet fa-lg"></i></span>
      <span v-show="isRandom" @click="isRandom = !isRandom"><i class="fas fa-random fa-lg"></i></span>
      <span><i class="fas fa-list-ul fa-lg"></i></span>
    </div>
  </div>
</template>

<script>
import { getMusicUrl } from '../api/api';

  export default {
    name: 'm-play',
    data(){
      return {
        isPlay: false,
        playIndex: null,
        value: 0,
        volume: 0,
        isVolume: false,
        isRandom: false,
      }
    },
    computed: {
      playTracks(){
        const length = this.$store.state.music.tracks.length;
        if(length > 0){
          this.isRandom ? this.playIndex = Math.floor(Math.random() * length) : this.playIndex = 0;
        }
        return this.$store.state.music.tracks;
      },
      playPic(){
        return this.playTracks.length > 0 ? this.playTracks[this.playIndex].al.picUrl : ''; 
      },
      alName(){
       return this.playTracks.length > 0 ? this.playTracks[this.playIndex].al.name : ''; 
      },
      arName(){
        return this.playTracks.length > 0 ? this.playTracks[this.playIndex].ar[0].name : '';
      }
    },
    watch: {
      playIndex(val, oldval){
        let { id } = this.playTracks[val];
        this.getMusicUrl(id);
      }
    },
    methods: {
      getMusicUrl(id){
        getMusicUrl(id)
        .then((result) => {
         let { data : { data: [ {url} ] } } = result;
         const musicAudio = this.$refs['musicAudio'];
         musicAudio.src = url;
         musicAudio.play();
        })  
      }
    }
  }  
</script>

<style lang="scss">
  .m-play{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 53px;
    line-height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #272727;
    color: #ffffff;
    & .play-btns{
      width: 137px;
      & span {
        display: inline-block;
        cursor: pointer;
        margin-right: 8px;
        width: 28px;
      }
    }
    & .play-head{
      width: 34px;
      height: 100%;
      margin-right: 16px;
      & span {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin: 9.5px 0;
        & img {
          max-width: 34px;
          max-height: 34px;
        }
      }
    }
    & .play-audio{
      width: 608px;
      height: 53px;
      position: relative;
      & .play-meta{
        height: 28px;
        line-height: 28px;
        overflow: hidden;
        color: #e8e8e8;
        font-size: 12px;
        & .meta-name{
          max-width: 300px;
          color: #e8e8e8;
          overflow: hidden;
          cursor: pointer;
        }
        & .meta-author{
          max-width: 220px;
          margin-left: 15px;
          color: #9b9b9b;
          cursor: pointer;
        }
      }
      & .play-slider{
        position: relative;
        width: 493px;
        & .play-time{
          position: absolute;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          top: calc(50% - 10px);
          right: -100px;
        }
      }
    }
    & .play-control{
      height: 53px;
      position: relative;
      & .play-volume{
        position: absolute;
        top: -113px;
        width: 32px;
        height: 113px;
        background: #272727;
        padding: 13px 0;
      }
      & span {
        display: inline-block;
        width: 25px;
        text-align: center;
        margin-right: 2px;
        cursor: pointer;
      }
    }
  }
</style>

