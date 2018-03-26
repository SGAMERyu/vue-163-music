<template>
  <div class="playlist-main">
    <div class="playlist-list" v-for="(list, index) in playlist" :key="index" @click.stop="handleDetail(list)">
      <div class="playlist-meta">
        <img :src="list.picUrl">
        <div class="playlist-toolbar">
          <span><i class="fas fa-headphones fa-sm"></i></span>
          <span>{{list.playCount}}</span>
          <span @click.stop="handlePlay(list)"><i class="far fa-play-circle fa-sm"></i></span>
        </div>
      </div>
      <div class="playlist-bottom">
        <p>{{list.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'playlist',
    props: {
      playData: Array,
      limit: {
        type: Number,
        default: 8,
      }
    },
    computed: {
      playlist(){
        const data = this.playData.slice(0, this.limit).map(item => {
          let playCount = Math.floor(item.playCount / Math.pow(10, 4));
          playCount > 10 ? item.playCount = playCount + '万' : item.playCount = String(item.playCount).replace(/\.\d+/g, ' ');
          return item;
        });
        return data;
      }
    },
    methods: {
      handlePlay(list){
        this.$emit('setTracks', list);
      },
      handleDetail(list){
        this.$router.push({name: 'playlist', query: { id: list.id }});
      }
    }
  }
</script>

<style lang="scss">
  .playlist-main{
    display: flex;
    flex-wrap: wrap;
    margin-left: -42px;
    & .playlist-list{
      max-width: 182px;
      height: 204px;
      padding-left: 42px;
      & .playlist-meta{
        width: 140px;
        height: 140px;
        position: relative;
        cursor: pointer;
        & img{
          max-width: 100%;
          max-height: 100%;
        }
        & .playlist-toolbar{
          position: absolute;
          bottom: 0%;
          left: 0%;
          width: 100%;
          height: 27px;
          line-height: 27px;
          color: #ccc;
          font-size: 12px;
          padding: 0 8px;
          display: flex;
          align-item: center;
          background: rgba(0, 0, 0, 0.5);
          & span:nth-of-type(1){
            margin-right: 10px;
          }
          & span:nth-of-type(3){
            margin-left: auto;
            cursor: pointer;
          }
        }
      }
      & .playlist-bottom{
        margin: 8px 0 3px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
