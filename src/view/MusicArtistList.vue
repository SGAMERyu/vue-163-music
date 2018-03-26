<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3" class="m-artistlists">
        <m-artistlist :artistlist="artistlist"></m-artistlist>
      </sg-col>
    </sg-row>
  </div>
</template>

<script>
  import { api } from '../api/api';
  import artistlist from '../components/artistlist.vue';

  export default {
    name: 'artistlists',
    data(){
      return {
        artistlist: [],
      }
    },
    components: {
      'm-artistlist': artistlist
    },
    methods: {
      async getArtistList(offset){
        const { data: { artists: artistlist } } = await api.getTopArtists$offset(offset);
        this.artistlist = artistlist; 
      }
    },
    created(){
      this.getArtistList(0);
    }
  }
</script>

<style lang="scss">
  .m-artistlists{
    padding: 40px;
    background: #fff;
    margin-bottom: 25px;
  }
</style>
