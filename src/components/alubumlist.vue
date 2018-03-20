<template>
  <div class="albumlist-main">
    <div class="albumlist-list" v-for="(album, index) in albumlist" :key="index" @click.stop="handleDetail(album)">
      <div class="albumlist-meta">
        <img :src="album.picUrl">
        <span class="albumlist-play" @click.stop="handlePlay(album)"><i class="far fa-play-circle fa-sm"></i></span>
      </div>
      <div class="albumlist-bottom">
        <p>{{album.name}}</p>
        <p>{{album.artist.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'albumlist',
    props: ['albumlist'],
    methods: {
      handlePlay(album){
        this.$emit('setTracks', album);
      },
      handleDetail(album){
        this.$router.push({name: 'album', query: { id: album.id }});
      }
    }
  }
</script>

<style lang="scss">
  .albumlist-main{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & .albumlist-list{
      flex: 1 0 auto;
      min-width: 118px;
      height: 150px;
      cursor: pointer;
      & .albumlist-meta{
        width: 100px;
        height: 100px;
        position: relative;
        & img{
          max-width: 100%;
          max-height: 100%;
        }
        & .albumlist-play{
          position: absolute;
          right: 10px;
          bottom: 5px;
          color: #fff;
          display: none;
        }
        &:hover{
          & .albumlist-play{
            display: block;
          }
        }
      }
      & .albumlist-bottom{
        font-size: 12px;
        & p {
          width: 100px;
          line-height: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-of-type(2){
            color: #666;  
          }
        }
      }
    }
  }
</style>
