<template>
  <sg-row :gutter="15">
    <sg-col :col="18">
      <div class="rank-nav">
        <router-link to="playlist" class="rank-title">
          <span><i class="fas fa-dot-circle"></i></span>
          热门推荐
          </router-link>
        <sg-breadcrumb separator="|" gutter="10" class="rank-meta">
          <sg-breadcrumb-item>华语</sg-breadcrumb-item>
          <sg-breadcrumb-item>流行</sg-breadcrumb-item>
          <sg-breadcrumb-item>摇滚</sg-breadcrumb-item>
          <sg-breadcrumb-item>民谣</sg-breadcrumb-item>
          <sg-breadcrumb-item>电子</sg-breadcrumb-item>
        </sg-breadcrumb>
        <router-link to="playlist" class="rank-more">更多</router-link>
      </div>
      <div class="rank-area">
        <div v-for="(hot, index) in hotList" :key="index" class="rank-hot">
          <div class="hot-meta">
            <img :src="hot.coverImgUrl" alt="" srcset="">
            <div class="hot-meta-bottom">
              <span><i class="fas fa-headphones fa-sm"></i></span>
              <span>{{hot.playCount}}</span>
              <span><i class="far fa-play-circle fa-sm"></i></span>
              </div>
          </div>
          <div class="hot-bottom">
            <p>{{hot.name}}</p>
          </div>
        </div>
      </div>
      <div class="rank-nav">
        <router-link to="album" class="rank-title">
          <span><i class="fas fa-dot-circle"></i></span>
          新碟上架
        </router-link>
        <router-link to="album" class="rank-more">更多</router-link>
      </div>
      <div class="rank-area">
        <div v-for="(album, index) in albumLists" :key="index" class="rank-album">
          <div class="album-meta">
            <img :src="album.picUrl" alt="">
            <span class="album-play"><i class="far fa-play-circle fa-sm"></i></span>
          </div>
          <div class="album-bottom">
            <p>{{album.name}}</p>
            <p>{{album.artist.name}}</p>
          </div>
        </div>
      </div>
      <div class="rank-nav">
        <router-link to="toplist" class="rank-title">
          <span><i class="fas fa-dot-circle"></i></span>
          榜单
        </router-link>
        <router-link to="toplist" class="rank-more">更多</router-link>
      </div>
      <div class="rank-area">
        <div v-for="(top, index) in topList" :key="index" class="rank-top">
          <div class="top-meta">
            <img :src="top.coverImgUrl" alt="" srcset="">
            <div class="top-desc">
              <span>{{top.name}}</span>
              <div class="top-btn">
                <span><i class="far fa-play-circle fa-lg"></i></span>
                <span><i class="far fa-folder fa-lg"></i></span>
              </div>
            </div>
          </div>
          <ul class="top-list" type="1">
            <li v-for="(track, index) in top.tracks" :key="index">
              <span class="list-type" :class="{'top': index + 1 <= 3}">{{index + 1}}</span>
              <span class="list-name">{{track.name}}</span>
              <div class="oper">
                <span><i class="far fa-play-circle fa-lg"></i></span>
                <span><i class="fas fa-plus fa-lg"></i></span>
                <span><i class="far fa-folder fa-lg"></i></span>
              </div>
            </li>
            <li><span class="bottom">查看全部></span></li>
          </ul>
        </div>
      </div>
    </sg-col>
    <sg-col :col="6">
      <div class="rank-nav singed">
        <span>入驻歌手</span>
        <router-link to="playlist" class="rank-more">查看全部</router-link>
      </div>
      <div class="rank-singed" v-for="(artists, index) in artistsList" :key="index">
        <img :src="artists.picUrl" alt="" srcset="">
          <h3 class="singed-name">{{artists.name}}</h3>
      </div>
    </sg-col>
  </sg-row>
</template>

<script>
import { getHotList, getAlbumList, getHomeTop, getArtistsList} from '../api/api';

  export default {
    name: 'm-rank',
    data(){
      return {
        hotLists: [],
        albumLists: [],
        topLists: [],
        artistsList: []
      }
    },
    computed: {
      hotList(){
        return this.hotLists.map(list => { 
          let playCount = list.playCount / Math.pow(10, 4); 
          playCount > 10 ? list.playCount = String(playCount).replace(/\.\d+/, '万') : '';
          return list;
        })
      },
      topList(){
        return this.topLists.map(list => {
          list.tracks = list.tracks.slice(0, 10);
          return list;
        })
      }
    },
    methods: {
      getHotList(){
        getHotList()
        .then(result => this.hotLists = result.data.playlists);
      },
      getAlbumList(){
        getAlbumList()
        .then(result => this.albumLists = result.data.albums);
      },
      getTopList(){
        getHomeTop()
        .then(result => result.forEach(res => {
          this.topLists.push(res.data.playlist);
        }))
      },
      getArtistsList(){
        getArtistsList()
        .then(result => this.artistsList = result.data.artists)
      }
    },
    created(){
      this.getHotList();
      this.getAlbumList();
      this.getTopList();
      this.getArtistsList();
    }
  }
</script>

<style lang="scss">
  .rank-nav{
    display: flex;
    height: 33px;
    line-height: 33px;
    border-bottom: 2px solid #C10D0C;
    & .rank-meta{
      height: 33px;
      line-height: 33px;
    }
    &.singed{
      font-size: 12px;
      border-bottom: 1px solid #ccc;
      & .rank-more{
        color: #666;
      }
    }
  }
  .rank-title{
    color: #000000;
    font-size: 20px;
    line-height: 28px;
    margin-right: 10px;
    & span{
      color: #c10d0c;
    }
  }
  .rank-more{
    margin-left: auto;
  }
  .rank-area{
    margin-top: 20px;
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &.singed{
      margin: 6px 0 14px 20px;
    }
  }
  .rank-hot{
    width: 140px;
    height: 204px;
    margin-right: 35px;
    cursor: pointer;
    & .hot-meta{
      width: 140px;
      height: 140px;
      position: relative;
      & img{
        max-width: 100%;
        max-height: 100%;
      }
      & .hot-meta-bottom{
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
    & .hot-bottom{
      margin: 8px 0 3px;
      font-size: 14px;
    }
  }
  .rank-album{
    width: 110px;
    height: 150px;
    maring-right: 20px;
    cursor: pointer;
    & .album-meta{
      width: 100px;
      height: 100px;
      position: relative;
      &:hover{
        & .album-play{
          display: block;
        }
      }
      & img{
        max-width: 100%;
        max-height: 100%;
      }
      & .album-play{
        position: absolute;
        right: 10px;
        bottom: 5px;
        color: #fff;
        display: none;
      }
    }

    & .album-bottom{
      font-size: 12px;
      width: 100px;
      overflow: hidden;
      & p:nth-of-type(2){
        color: #666;
      }
    }
  }
  .rank-top{
    flex: 1 0 auto;
    background: #f4f4f4;
    border: 1px solid #d3d3d3;
    & .top-meta{
      height: 120px;
      padding: 20px 0 20px 19px;
      & img{
        max-width: 100%;
        max-height: 100%;
        float: left;
      }
      & .top-desc{
        width: 116px;
        float: left;
        margin: 6px 0 0 10px;
        font-size: 14px;
        color: #333;
        & .top-btn{
          display: block;
          margin-top: 10px;
          color: #bfbfbf;
          & span {
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
    & .top-list{
      line-height: 32px;
      font-size: 12px;
      & .list-type{
        margin-left: 15px;
        width: 35px;
        height: 32px;
        display: inline-block;
        text-align: center;
        font-size: 16px;
        color: #666;
      }
      & .top{
        color: #c10d0c;
      }
      & .bottom{
        margin-left: auto;
        margin-right: 30px;
      }
      & .oper{
        display: none;
        margin-left: auto;
        margin-right: 10px;
        color: #666;
        & span{
          margin-right: 10px;
        }
      }
      & .list-name{
        width: 176px;
        height: 32px;
        overflow: hidden;
      }
      & li {
        display: flex;
        height: 32px;
        cursor: pointer;
        &:nth-of-type(odd){
          background: #e8e8e8;
        }
        &:hover{
          & .oper{
            display: block;
          }
          & .list-name{
            width: 76px;
          }
        }
      }
    }
  }
  .rank-singed{
    margin-top: 15px;
    width: 100%;
    height: 62px;
    background: #fafafa;
    cursor: pointer;
    & img{
      max-width: 62px;
      min-height: 62px;
      float: left;
    }
    & .singed-name{
      width: calc(100% - 62px);
      padding-left: 14px;
      float: left;
      font-size: 14px;
      color: #333;
      height: 62px;
      border: 1px solid #e9e9e9;
      padding-top: 8px;
    }
  }
</style>

