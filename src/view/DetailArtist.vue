<template>
  <div>
    <sg-row>
      <m-loading :mask="false" v-show="!isLoading"></m-loading>
      <sg-col :col="18" :offset="3" class="m-artistDetail">
        <detail-head :detailData="artist" v-on:setTracks="handlePlay"></detail-head>
        <detail-song :songData="hotSongs"></detail-song>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import detailHead from '../components/DetailHead.vue';
  import detailSong from '../components/DetailSong.vue';
  import loading from '../components/Loading.vue';

  export default {
    name: 'artist',
    data(){
      return {
        id: null,
        artist: {},
        hotSongs: []
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong,
      'm-loading': loading
    },
    methods: {
      async getArtistData(){
        this.isLoading = false;

        const { query: { id } } = this.$route;
        this.id = id;
        [
          { data: { artist: this.artist,  hotSongs: this.hotSongs} }
        ] = await Promise.all([
            api.getArtists$id(id)
        ])

        this.isLoading = true;
      },
      handlePlay(){
        this.$store.commit('getTracks', this.hotSongs);
      }
    },
    created(){
      this.getArtistData();
    }
  }
</script>

<style lang="scss">
  .m-artistDetail{
    padding: 47px 30px 40px 39px;
    background: #ffffff;
    & .detail-meta{
      display: flex;
      & .detail-img{
        width: 250px;
        height: 250px;
        border-radius: 50%;
      }
      & .detail-info{
        margin-left: 25px;
      }
    }
  }
</style>
