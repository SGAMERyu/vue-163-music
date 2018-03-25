<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-playDetail">
        <sg-row>
          <sg-col :col="18">
            <detail-head :detailData="playlist" v-on:setTracks="handlePlay"></detail-head>
            <detail-song :songData="playlist.tracks"></detail-song>
            <detail-comment :commentData="commentlist"></detail-comment>
            <sg-pagination :total="commentlist.total" v-on:currentChange="getCommentPlaylist"></sg-pagination>
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
        id: null,
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
      async getCommentPlaylist(offset){
        const { data }= await api.getCommentPlaylist$id(this.id, {offset: offset}, true);
        this.commentlist = data;
      },
      async getPlaylistData(){
        const { query: { id }} = this.$route;
        this.id = id;
        [
          { data: { playlist: this.playlist } },
          { data: { playlists: this.toplist } },
          { data: this.commentlist }
        ] = await Promise.all([
            api.getPlaylistDetail$id(id),
            api.getTopPlaylist$limit(10, {order: 'new'}, true),
            api.getCommentPlaylist$id(this.id, {offset: 0}, true)
        ])

        this.playlist.createTime = this.formatDate(this.playlist.createTime);
      },
      formatDate(now){
        const date = new Date(now);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
      handlePlay(){
        this.$store.commit('getTracks', this.playlist.tracks);
      },
    },
    created(){
      this.getPlaylistData();
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

