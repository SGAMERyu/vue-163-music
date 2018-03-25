<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-albumDetail">
        <sg-row>
          <sg-col :col="18">
              <detail-head :detailData="albumDetail" v-on:setTracks="handlePlay"></detail-head>
              <detail-song :songData="albumSongs"></detail-song>
              <detail-comment :commentData="commentlist"></detail-comment>
              <sg-pagination :total="commentlist.total" v-on:currentChange="getCommentAlbum"></sg-pagination>
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
  import detailComment from '../components/detailComment.vue';

  export default {
    name: 'album',
    data(){
      return {
        id: null,
        albumData: [],
        albumDetail: {},
        albumSongs: {},
        toplist: [],
        commentlist: []
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong,
      'detail-comment': detailComment,
      'slidebar': slidebar,
    },
    methods: {
      async getCommentAlbum(offset){
        const { data }= await api.getCommentAlbum$id(this.id, {offset: offset}, true);
        this.commentlist = data;
      },
      async getAlbumData(){
        const { query: { id } } = this.$route;
        this.id = id;
        [
          { data: { album: this.albumDetail, songs: this.albumSongs } },
          { data: { playlists: this.toplist } },
          { data: this.commentlist }
        ] = await Promise.all([
            api.getAlbum$id(this.id), 
            api.getTopPlaylist$limit(10, {order: 'new'}, true),
            api.getCommentAlbum$id(this.id, {offset: 0}, true)
            ])
      },
      handlePlay(){
        this.$store.commit('getTracks', this.albumSongs);
      }
    },
    created(){
      this.getAlbumData();
    }
  }
</script>

<style lang="scss">
  .m-albumDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
    margin-bottom: 50px;
  }
</style>
