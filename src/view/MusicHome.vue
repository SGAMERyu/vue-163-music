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
      <m-rank :homeData="homeData" :topLists="topData"></m-rank>
    </sg-col>
  </sg-row>
</div>
</template>

<script>
import { api } from '../api/api';
import Rank from '../components/Rank';

  export default {
    name: 'Home',
    data(){
      return {
        banners: [],
        homeData: [],
        topData: []
      }
    },
    methods: {
      async getData(){
        const { data: { banners } } = await api.getBanner();
        this.banners = banners;

        this.homeData = await Promise.all([
          api.getPersonalized(), 
          api.getTopAlbum$offset(0, {limit: 5}, true), 
          api.getTopPlaylist$limit(10, {order: 'hot'}, true)
        ]);

        const topData = await Promise.all([
          api.getTopList$idx(3), 
          api.getTopList$idx(1), 
          api.getTopList$idx(2)
        ])

        this.topData = topData.map((list) => list.data.playlist );

        this.$store.commit('initData', false);
      },
    },
    created(){
      this.getData();
    },
    components: {
      'm-rank': Rank
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
