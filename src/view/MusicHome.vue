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
  </sg-row>
</div>
</template>

<script>
import { getBanner } from '../api/api';

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
  }
</style>
