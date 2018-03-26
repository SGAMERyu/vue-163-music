<template>
  <div>
    <sg-row>
      <m-loading :mask="false" v-show="!isLoading"></m-loading>
      <sg-col :col="18" :offset="3" class="m-playlists" v-show="isLoading">
        <m-playlist :playData="playLists" v-on:setTracks="handlePlayList" :limit="35"></m-playlist>
          <sg-pagination :total="total" :page-size="35" v-on:currentChange="getPlayList"></sg-pagination>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import playlist from '../components/playlist.vue';
  import loading from '../components/Loading.vue';

  export default {
    name: 'playlists',
    data(){
      return {
        playLists: [],
        total: 0,
        isLoading: false
      }
    },
    components: {
      'm-playlist': playlist,
      'm-loading': loading
    },
    methods: {
      async getPlayList(offset){
        this.isLoading = false;

        const  { data: { playlists: playLists, total } }= await api.getTopPlaylist$limit(35,{ order: 'hot', offset: offset }, true);
        this.playLists = playLists.map(list => { 
          list.picUrl = list.coverImgUrl;
          return list;
        });
        this.total = total;

        this.isLoading = true;
      },
      handlePlayList(playlist){
        this.$store.dispatch('getMusicDetail', playlist);
      }
    },
    created(){
      this.getPlayList(0);
    }
  }  
</script>

<style lang="scss">
  .m-playlists{
    padding: 40px;
    background: #fff;
    margin-bottom: 25px;
  }
</style>
