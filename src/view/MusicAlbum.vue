<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3">
        <sg-row>
          <sg-col :col="18">
            <div class="m-albumDetail">
              <detail-head :detailData="albumDetail" v-on:setTracks="handlePlay"></detail-head>
              <detail-song :songData="albumSongs"></detail-song>
            </div>
          </sg-col>
        </sg-row>
        <sg-row :col="6"></sg-row>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import detailHead from '../components/DetailHead.vue';
  import detailSong from '../components/DetailSong.vue';

  export default {
    name: 'album',
    data(){
      return {
        albumDetail: {},
        albumSongs: {},
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong
    },
    methods: {
      async getAlbumDetail(id){
        const { data } = await api.getAlbum$id(id);
        this.albumDetail = data.album;
        this.albumSongs = data.songs
      },
      handlePlay(){
        this.$store.commit('getTracks', this.albumSongs);
      }
    },
    created(){
      const { query: { id } } = this.$route;
      this.getAlbumDetail(id);
    }
  }
</script>

<style lang="scss">
  .m-albumDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
  }
</style>
