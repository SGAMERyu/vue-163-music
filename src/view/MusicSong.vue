<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3">
        <sg-row>
          <sg-col :col="18">
            <div class="m-songDetail">
              <detail-head :detailData="song" v-on:setTracks="handlePlay"></detail-head>
            </div>
          </sg-col>
          <sg-col :col="6"></sg-col>
        </sg-row>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import detailHead from '../components/DetailHead.vue';
  import detailSong from '../components/DetailSong.vue';

  export default {
    name: 'song',
    data(){
      return {
        song: {},
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong
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
    }
  }
</script>

<style lang="scss">
  .m-songDetail{
    padding: 47px 30px 40px 39px;
    background: #fff;
  }
</style>
