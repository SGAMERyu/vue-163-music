<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-playDetail">
        <sg-row>
          <sg-col :col="18">
            <detail-head :detailData="playlist" v-on:setTracks="handlePlay"></detail-head>
            <detail-song :songData="playlist.tracks"></detail-song>
            <detail-comment :commentData="commentlist"></detail-comment>
            <sg-pagination :total="commentlist.total"></sg-pagination>
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
    name: 'playlist',
    data(){
      return {
        playlist: {},
        toplist: [],
        commentlist: []
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong,
      'slidebar': slidebar,
      'detail-comment': detailComment
    },  
    methods: {
      async getMusicDetail(id){
        const { data: { playlist } } = await api.getPlaylistDetail$id(id)
        playlist.createTime = this.formatDate(playlist.createTime);
        this.playlist = playlist;
      },
      async getTopPlaylist(limit){
        const { data: { playlists }} = await api.getTopPlaylist$limit(limit, {order: 'new'}, true);
        this.toplist = playlists;
      },
      async getCommentPlaylist(id, offset){
        const { data }= await api.getCommentPlaylist$id(id, {offset: offset}, true);
        this.commentlist = data;
      },
      formatDate(now){
        const date = new Date(now);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
      handlePlay(){
        this.$store.commit('getTracks', this.playlist.tracks);
      }
    },
    created(){
      const { query: { id }} = this.$route;
      this.getMusicDetail(id);
      this.getTopPlaylist(10);
      this.getCommentPlaylist(id, 0);
    }
  }  
</script>

<style lang="scss">
  .m-playDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
    margin-bottom: 50px;
  }
</style>

