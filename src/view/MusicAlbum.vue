<template>
  <div class="m-albumDetail">
    <sg-row>
      <sg-col :col="18" :offset="3">
        <sg-row :gutter="15">
          <sg-col :col="18">
            <detail-head :detailData="albumDetail"></detail-head>
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

  export default {
    name: 'album',
    data(){
      return {
        albumDetail: {}
      }
    },
    components: {
      'detail-head': detailHead
    },
    methods: {
      async getAlbumDetail(id){
        const { data } = await api.getAlbum$id(id);
        this.albumDetail = data.album;
      }
    },
    created(){
      const { query: { id } } = this.$route;
      this.getAlbumDetail(id);
    }
  }
</script>

<style lang="scss">
  
</style>
