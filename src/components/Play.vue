<template>
<div class="m-play">
  <sg-row>
  <sg-col :col="18" :offset="3" class="play-list">
    <div class="play-btns">
      <span class="fas fa-step-backward fa-lg" @click="prev"></span>
      <span v-show="!isPlay" @click="isPlay = !isPlay" class="far fa-play-circle fa-lg"></span>
      <span v-show="isPlay" @click="isPlay = !isPlay" class="far fa-pause-circle fa-lg"></span>
      <span class="fas fa-step-forward fa-lg" @click="next"></span>
    </div>
    <div class="play-head">
      <span v-show="!playPic" class="fas fa-music fa-lg"></span>
      <span v-show="playPic"><img :src="playPic"></span>
    </div>
    <div class="play-audio">
      <audio ref="musicAudio" :src="playUrl"></audio>
      <div class="play-meta">
        <span class="meta-name" v-show="alName">{{alName}}</span>
        <span class="meta-author" v-show="arName">{{arName}}</span>
      </div>
      <div class="play-slider">
        <sg-slider v-model="value" :gutter="0" :width="493" @change="setTime"></sg-slider>
        <span class="play-time">{{currentTime}} / {{totalTime}}</span>
      </div>
    </div>
    <div class="play-control">
      <div class="play-volume" v-show="isVolume">
        <sg-slider :height="93" :width="4" :gutter="14" v-model="volume" vertical @change="setVolume"></sg-slider>
      </div>
      <span @click="isVolume = !isVolume"><i class="fas fa-volume-up fa-lg"></i></span>
      <span v-if="!isRandom" @click="isRandom = !isRandom" class="fas fa-retweet fa-lg"></span>
      <span v-else @click="isRandom = !isRandom" class="fas fa-random fa-lg"></span>
      <span class="fas fa-list-ul fa-lg" @click="routePlayer"></span>
    
    </div>
  </sg-col>
  </sg-row>
</div>
</template>

<script>
import { api } from "../api/api";

export default {
  name: "m-play",
  data() {
    return {
      value: 0,
      volume: 50,
      isVolume: false,
      isRandom: false,
      musicAudio: null,
      currentTime: "00 : 00",
      totalTime: "00 : 00"
    };
  },
  computed: {
    isPlay:{
      get(){
        return this.$store.state.music.isPlay;
      },
      set(value){
        this.$store.commit('setPlay', value)
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
    playTime: {
      get(){
        return this.$store.state.music.playTime;
      },
      set(value){
        this.currentTime = this.coverTime(value);
        this.$store.commit('setTime', value);
      }
    },
    playTracks() {
      return this.$store.state.music.tracks;
    },
    playLength() {
      return this.$store.state.music.tracks.length;
    },
    playUrl(){
      return this.$store.state.music.playUrl;
    },
    playPic() {
      return this.playLength > 0
        ? this.playTracks[this.playIndex].al.picUrl
        : "";
    },
    alName() {
      return this.playLength > 0 ? this.playTracks[this.playIndex].name : "";
    },
    arName() {
      return this.playLength > 0
        ? this.playTracks[this.playIndex].ar[0].name
        : "";
    }
  },
  watch: {
    currentTime() {
      this.setValue();
    },
    playTracks(val) {
      if(this.playIndex === 0){
        this.setUrl()
      }
      this.playIndex = 0;
    },
    isPlay(val) {
      val ? this.musicAudio.play() : this.musicAudio.pause();
    },
    playIndex(val, oldval){
      val !== -1 ? this.setUrl() : this.musicAudio.pause();
    }
  },
  methods: {
    setUrl() {
      this.value = 0;
      this.isPlay = false;
      this.$store.dispatch('getMusicUrl');
    },
    setVolume(val) {
      this.musicAudio.volume = val * 0.01;
    },
    bindEvent() {
      this.musicAudio.addEventListener("canplay", () => {
        this.isPlay = true;
        this.totalTime = this.coverTime(this.musicAudio.duration);
      });
      this.musicAudio.addEventListener("timeupdate", () => {
        this.playTime = this.musicAudio.currentTime;
      });
      this.musicAudio.addEventListener("ended", () => {
        this.next();
      });
    },
    coverTime(time) {
      let minute = Math.floor((time / 60) % 60);
      let second = Math.floor(time % 60);
      minute = minute >= 10 ? minute : `0${minute}`;
      second = second >= 10 ? second : `0${second}`;
      return `${minute} : ${second}`;
    },
    setValue() {
      let value = Math.floor(
        this.musicAudio.currentTime / this.musicAudio.duration * 100
      );
      this.value = value;
    },
    setTime(val) {
      this.musicAudio.currentTime = this.musicAudio.duration * val * 0.01;
    },
    setIndex(index) {
      if (this.isRandom) {
        this.playIndex = Math.floor(Math.random() * this.playTracks.length);
      } else if (index < 0) {
        this.playIndex = this.playLength - 1;
      } else if (index > this.playLength - 1) {
        this.playIndex = 0;
      } else {
        this.playIndex = index;
      }
    },
    prev() {
      this.playLength !== 1 ? this.setIndex(this.playIndex - 1) : this.musicAudio.currentTime = 0;
    },
    next() {
      this.playLength !== 1 ? this.setIndex(this.playIndex + 1) : this.musicAudio.currentTime = 0;
    },
    routePlayer(){
      this.$router.push({name: 'player'})
    }
  },
  mounted() {
    this.musicAudio = this.$refs["musicAudio"];
    this.bindEvent();
  }
};
</script>

<style lang="scss">
.m-play {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #272727;
  color: #ffffff;
  & .play-list{
    height: 53px;
    line-height: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .play-btns {
    width: 137px;
    & span {
      display: inline-block;
      cursor: pointer;
      margin-right: 8px;
      width: 28px;
    }
  }
  & .play-head {
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
  & .play-audio {
    width: 608px;
    height: 53px;
    position: relative;
    & .play-meta {
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      color: #e8e8e8;
      font-size: 12px;
      & .meta-name {
        max-width: 300px;
        color: #e8e8e8;
        overflow: hidden;
        cursor: pointer;
      }
      & .meta-author {
        max-width: 220px;
        margin-left: 15px;
        color: #9b9b9b;
        cursor: pointer;
      }
    }
    & .play-slider {
      position: relative;
      width: 493px;
      & .play-time {
        position: absolute;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        top: calc(50% - 10px);
        right: -100px;
      }
    }
  }
  & .play-control {
    height: 53px;
    position: relative;
    & .play-volume {
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

