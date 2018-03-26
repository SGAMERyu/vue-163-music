<template>
  <div>
    <sg-row>
      <m-loading :mask="false" v-show="!isLoading"></m-loading>
      <sg-col :col="18" :offset="3" class="m-playlists">
        <m-albumlist :albumlist="albumLists" v-on:setTracks="handlePlay" :limit="35"></m-albumlist>
          <sg-pagination :total="total" :page-size="35" v-on:currentChange="getPlayList"></sg-pagination>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import albumlist from '../components/alubumlist.vue';
  import loading from '../components/Loading.vue';

  export default {
    name: 'albumlists',
    data(){
      return {
        albumLists: [],
        total: 0
      }
    },
    components: {
      'm-albumlist': albumlist,
      'm-loading': loading
    },
    methods: {
      async getPlayList(offset){
        this.isLoading = false;

        const  { data: { albums: albums, total } }= await api.getTopAlbum$limit(35,{ order: 'hot', offset: offset }, true);
        this.albumLists = albums;
        this.total = total;

         this.isLoading = true;
      },
      handlePlay(playlist){
        this.$store.dispatch('getAlbumDetail', playlist);
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
