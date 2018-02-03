<template>
<div class="m-home">
  <sg-row>
    <sg-col :col="24">
      <sg-carousel height="336">
        <sg-carousel-item v-for="(banner, index) in banners" :key="index" >
          <img :src="banner.pic" alt="" class="home-pic">
        </sg-carousel-item>
      </sg-carousel>
    </sg-col>
    <sg-col :col="18" :offset="3" class="home-rank">
      <m-rank></m-rank>
    </sg-col>
  </sg-row>
</div>
</template>

<script>
import { getBanner } from '../api/api';
import MusciRank from '../components/MusicRank';

  export default {
    name: 'Home',
    data(){
      return {
        banners: []
      }
    },
    created(){
      getBanner()
      .then((result)=>{
        this.banners = result.data.banners;
      })
    },
    components: {
      'm-rank': MusciRank
    }
  }
</script>

<style lang="scss">
  .m-home{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    & .home-pic{
      width: 100%;
      height: 100%;
    }
    & .home-rank{
      padding: 20px 20px 40px;
      background: #ffffff;
      border: 1px solid #d3d3d3;
    }
  }
</style>
