<template>
  <div class="m-play">
    <div class="play-btns">
      <span><i class="fas fa-step-backward fa-lg"></i></span>
      <span><i class="far fa-play-circle fa-lg"></i></span>
      <span><i class="fas fa-step-forward fa-lg"></i></span>
    </div>
    <div class="play-head">
      <span v-if="isPlay"><i class="fas fa-music fa-lg"></i></span>
      <span v-else><img :src="musicPic" alt="" srcset=""></span>
    </div>
    <div class="play-audio">
      <audio>
        <source v-for="(src, index) in sources" :key="index">
      </audio>
      <div class="play-progress" ref="slider" @click="handleClick">
        <div class="play-fill" ref="fill"></div>
        <div class="play-thumb"></div>
      </div>
      <span class="play-time">00:00 / 00:00</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'm-play',
    data(){
      return {
        isPlay: true,
        musicPic: '',
        sources: []
      }
    },
    methods: {
      handleClick(event){
        const offsetLfet = this.$refs.slider.getBoundingClientRect().left;
        console.log((event.clientX - offsetLfet ) / this.$refs.slider.clientWidth * 100);
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
    & .play-btns{
      color: #ffffff;
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
      color: #ffffff;
    }
    & .play-audio{
      width: 493px;
      height: 53px;
      position: relative;
      & .play-progress{
        width: 100%;
        height: 9px;
        margin: 22px 0;
        cursor: pointer;
        background: #131313;
        border: 1px solid #090909;
        border-radius: 5px;
        & .play-thumb{
          width: 16px;
          height: 16px;
          position: absolute;
          top: calc(50% - 8px);
          left: 0%;
          border-radius: 50%;
          background: #b8180d;
          box-shadow: inset 0 0 0 4px #ffffff;
          position: relative;
          z-index: 99;
        }
        & .play-fill{
          position: absolute;
          width: 0%;
          height: 9px;
          top: calc(50% - 2.5px);
          left: 0%;
          border-radius: 9px;
          background: #b8180d;
          pointer-events:none;
          z-index: 11;
        }
      }
      & .play-time{
        position: absolute;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        top: calc(50% - 9px);
        right: -100px;
        color: #ffffff;
      }
    }
  }
</style>

