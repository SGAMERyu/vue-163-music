<template>
  <div class="artistlist-main">
    <div class="artistlist-list" v-for="(artist, index) in artistlist" :key="index" @click="handleDetail(artist)">
      <div class="artistlist-meta">
        <img :src="artist.picUrl" alt="">
      </div>
      <div class="artistlist-bottom">
        <p>{{artist.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'artistlist',
    props: ['artistlist'],
    methods: {
      handleDetail(artist){
        this.$router.push({name: 'artist', query: { id: artist.id } });
      }
    }
  }
</script>

<style lang="scss">
  .artistlist-main{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & .artistlist-list{
      width: 160px;
      height: 154px;
      margin-bottom: 30px;
      & .artistlist-meta{
        width: 130px;
        height: 130px;
        & img{
          width: 100%;
          height: 100%;
        }
      }
      & .artistlist-bottom{
        width: 100%;
        font-size: 12px;      
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 5px;
      }
    }
  }
</style>
