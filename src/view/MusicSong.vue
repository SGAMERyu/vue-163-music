<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-songDetail">
        <sg-row>
          <sg-col :col="18">
            <detail-head :detailData="song" v-on:setTracks="handlePlay"></detail-head>
            <detail-comment :commentData="commentlist"></detail-comment>
              <sg-pagination :total="commentlist.total" v-on:currentChange="getCommentSong"></sg-pagination>
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
    name: 'song',
    data(){
      return {
        id: null,
        song: {},
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
      async getCommentSong(offset){
        const { data }= await api.getCommentMusic$id(this.id, {offset: offset}, true);
        this.commentlist = data;
      },
      async getSongData(){
        const { query: { id } } = this.$route;
        this.id = id;
        [
          { data: { songs: [ this.song ] } },
          { data: {playlists: this.toplist } },
          { data: this.commentlist }
        ] = await Promise.all([
            api.getSongDetail$ids(this.id),
            api.getTopPlaylist$limit(10, {order: 'new'}, true),
            api.getCommentMusic$id(this.id, {offset: 10}, true),
            api.getLyric$id(this.id)
        ])
        
        const { data: { lrc: { lyric } } } = await api.getLyric$id(id);
        const result = this.coverLyric(lyric);
        this.$set(this.song, 'lyrics', result);

      },
      coverLyric(lyric){
        let lines = lyric.split('\n');
        let pattern = /\[\d{2}:\d{2}.\d+\]/g;;
        let result = lines.map(line => {
          line = line.replace(pattern, " ").trim();
          return line;
        }) 
        return result;
      },
      handlePlay(){
        this.$store.commit('getTracks', [ this.song ]);
      }
    },
    created(){
      this.getSongData();
    }
  }
</script>

<style lang="scss">
  .m-songDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
    margin-bottom: 50px;
  }
</style>
