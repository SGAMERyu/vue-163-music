<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-songDetail">
        <sg-row>
          <sg-col :col="18">
            <detail-head :detailData="song" v-on:setTracks="handlePlay"></detail-head>
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
    name: 'song',
    data(){
      return {
        song: {},
        toplist: []
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong,
      'slidebar': slidebar
    },
    methods: {
      async getSongDetail(id){
        const { data: { songs: [ song ]} } = await api.getSongDetail$ids(id);
        this.song = song;
      },
      async getSongLyric(id){
         const { data: { lrc: { lyric } } } = await api.getLyric$id(id);
         const result = this.coverLyric(lyric);
         this.$set(this.song, 'lyrics', result);
      },
      async getTopPlaylist(limit){
        const { data: { playlists }} = await api.getTopPlaylist$limit(limit, {order: 'new'}, true);
        this.toplist = playlists;
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
      const { query: { id } } = this.$route;
      this.getSongDetail(id);
      this.getSongLyric(id);
      this.getTopPlaylist(10);
    }
  }
</script>

<style lang="scss">
  .m-songDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
  }
</style>
