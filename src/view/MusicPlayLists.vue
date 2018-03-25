<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-playlists">
        <m-playlist :playData="playLists" v-on:setTracks="handlePlayList" :limit="35"></m-playlist>
          <sg-pagination :total="total" :page-size="35" v-on:currentChange="getPlayList"></sg-pagination>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import playlist from '../components/playlist.vue';

  export default {
    name: 'playlists',
    data(){
      return {
        playLists: [],
        total: 0
      }
    },
    components: {
      'm-playlist': playlist,
    },
    methods: {
      async getPlayList(offset){
        const  { data: { playlists: playLists, total } }= await api.getTopPlaylist$limit(35,{ order: 'hot', offset: offset }, true);
        this.playLists = playLists.map(list => { 
          list.picUrl = list.coverImgUrl;
          return list;
        });
        this.total = total;
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
  }
</style>
