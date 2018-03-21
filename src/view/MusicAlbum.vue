<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-albumDetail">
        <sg-row>
          <sg-col :col="18">
              <detail-head :detailData="albumDetail" v-on:setTracks="handlePlay"></detail-head>
              <detail-song :songData="albumSongs"></detail-song>
          </sg-col>
          <sg-col :col="5" :offset="1">
            <slidebar title="最新歌单" :slideData="toplist"></slidebar>
          </sg-col>
        </sg-row>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import detailHead from '../components/DetailHead.vue';
  import detailSong from '../components/DetailSong.vue';
  import slidebar from '../components/sliderBar.vue';

  export default {
    name: 'album',
    data(){
      return {
        albumDetail: {},
        albumSongs: {},
        toplist: []
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong,
      'slidebar': slidebar
    },
    methods: {
      async getAlbumDetail(id){
        const { data } = await api.getAlbum$id(id);
        this.albumDetail = data.album;
        this.albumSongs = data.songs
      },
      async getTopPlaylist(limit){
        const { data: { playlists }} = await api.getTopPlaylist$limit(limit, {order: 'new'}, true);
        this.toplist = playlists;
      },
      handlePlay(){
        this.$store.commit('getTracks', this.albumSongs);
      }
    },
    created(){
      const { query: { id } } = this.$route;
      this.getAlbumDetail(id);
      this.getTopPlaylist(10);
    }
  }
</script>

<style lang="scss">
  .m-albumDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
  }
</style>
