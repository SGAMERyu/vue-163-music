<template>
  <div class="m-playDetail">
    <sg-row>
      <sg-col :col="18" :offset="3">
        <sg-row :gutter="15">
          <sg-col :col="18" class="playDetail-main">
            <div class="playDetail-meta">
                <img class="meta-img" :src="playlist.coverImgUrl" alt="">
                <div class="playDetail-info">
                  <h1>{{playlist.name}}</h1>
                  <span class="btn-1"><img :src="creator.avatarUrl" alt=""></span>
                  <span class="btn-1">{{creator.nickname}}</span>
                  <span class="btn-1">{{playlist.createTime}} 创建</span>
                  <div class="info-meta">
                    <span class="btn-2" @click="handlePlay"><i class="far fa-play-circle"></i>播放</span>
                    <span class="btn-2"><i class="far fa-folder"></i>{{playlist.subscribedCount}}</span>
                    <span class="btn-2"><i class="fas fa-share-square"></i>{{
                      playlist.shareCount
                    }}</span>
                    <span class="btn-2"><i class="fas fa-download"></i>下载</span>
                    <span class="btn-2"><i class="far fa-comment-alt"></i>{{playlist.commentCount}}</span>
                  </div>
                  <div class="info-title">
                    <span class="btn-3">标签:</span>
                    <span class="btn-3" v-for="(tag, index) in playlist.tags" :key="index">{{tag}}</span>
                  </div>
                  <div class="info-desc">
                    <span>介绍: </span>
                    <span>{{playlist.description}}</span>
                  </div>
                </div>
            </div>
            <div class="playDetail-tracks">
              <div class="track-meta">
                <div>歌曲列表 <span>{{playlist.trackCount}}首歌</span></div>
                <div>播放: {{playlist.playCount}} 次</div>
              </div>
              <ul class="track-list">
                <li class="track-item">
                  <div class="item-info">歌曲标题</div>
                  <div class="item-info">歌手</div>
                  <div class="item-info">专辑</div>
                  <div class="item-info">操作</div>
                </li>
                <li class="track-item" v-for="(track, index) in playlist.tracks" :key="index">
                  <div class="item-info">
                    <span>{{index + 1}}</span>
                    {{track.name}}
                  </div>
                  <div class="item-info">{{track.ar[0].name}}</div>
                  <div class="item-info">{{track.al.name}}</div>
                  <div class="item-info">
                    <span class="far fa-play-circle" @click="handleSong(track)"></span>
                    <span class="fas fa-plus"></span>
                    <span class="fas fa-download"></span>
                  </div>
                </li>
              </ul>
            </div>
          </sg-col>
          <sg-col :col="6" class="playDetail-aside">
            <div>热门歌单</div>
            <ul>
              <li class="playDetail-hot" v-for="(hot, index) in toplist" :key="index">
                <img :src="hot.coverImgUrl" class="hot-img">
                <div class="hot-info">
                  <p class="hot-name">{{hot.name}}</p>
                  <p class="hot-author">by {{hot.creator.nickname}}</p>
                </div>
              </li>
            </ul>
          </sg-col>
        </sg-row>
      </sg-col>
    </sg-row>
  </div>
</template>


<script>
import { api } from '../api/api';

export default {
    name: 'playlist',
    data(){
      return {
        playlist: {},
        creator: {},
        toplist: [],
      }
    },
    computed: {
      playTracks: {
        get(){
          return this.$store.state.music.tracks;
        },
        set(value){
          this.$store.commit('getTracks', value);
        }
      }
    },
    methods: {
      async getMusicDetail(id){
        const { data: { playlist } } = await api.getPlaylistDetail$id(id)
        playlist.createTime = this.formatDate(playlist.createTime);
        this.playlist = playlist;
        this.creator = playlist.creator;
      },
      async getTopPlaylist(limit){
        const { data: { playlists }} = await api.getTopPlaylist$limit(limit, {order: 'hot'}, true);
        this.toplist = playlists;
      },
      formatDate(now){
        const date = new Date(now);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
      handlePlay(){
        this.playTracks = this.playlist.tracks;
      },
      handleSong(track){
        this.$store.dispatch('getSongDetail', track);
      }
    },
    created(){
      const { query: { id }} = this.$route;
      this.getMusicDetail(id);
      this.getTopPlaylist(10);
    }
  }  
</script>

<style lang="scss">
  .m-playDetail{
    & .playDetail-main{
      padding: 47px 30px 40px 39px;
      & .playDetail-meta{
        display: flex;
        & .meta-img{
          width: 200px;
          height: 200px;
          border: 4px solid #fff;
          outline: 1px solid #d5d5d5;
        }
        & .playDetail-info{
          margin-left: 20px;
          & h1{
            line-height: 24px;
            font-size: 20px;
            margin-bottom: 10px;
          }
          & .btn-1{
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
          }
          & img{
            width: 35px;
            height: 35px;
          }
          & .info-meta{
            margin-top: 20px;
            & .btn-2{
              display: inline-block;
              min-width: 32px;
              height: 31px;
              line-height: 30px;
              border: 1px solid #c9c9c9;
              text-align: center;
              padding: 0 10px;
              margin-right: 15px;
              background: #ededed;
              color: #333;
              font-size: 14px;
              cursor: pointer;
              &:nth-of-type(1){
                background: #c20c0c;
                border: 1px solid #c20c0c;
                color: #fff;
              }
              & i {
                margin-right: 10px;
              }
            }
          }
          & .info-title{
            margin-top: 20px;
            & .btn-3:not(:nth-of-type(1)){
              display: inline-block;
              margin-left: 15px;
              height: 22px;
              line-height: 22px;
              background: #e1e1e1;
              border-radius: 22px;
              padding: 0px 10px;
              color: #777;
            }
          }
          & .info-desc{
            margin-top: 14px;
            line-height: 18px;
            font-size: 12px;
            color: #666;
          }
        }
      }
      & .playDetail-tracks{
        margin-top: 30px;
        & .track-meta{
          display: flex;
          justify-content: space-between;
        }
        & .track-list{
          margin-top: 15px;
          border: 1px solid #d9d9d9;
          margin-bottom: 50px;
          & .track-item{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            &:nth-of-type(odd){
                background: #e8e8e8;
            }
            & .item-info {
              flex: 1 0 auto;
              padding: 0 10px;
              width: 25%;
              height: 30px;
              line-height: 30px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              & span{
                color: #333;
              }
            }
          }
        }
      }
    }
    & .playDetail-aside{
      padding: 47px 30px 40px 39px;
      & .playDetail-hot{
        width: 200px;
        height: 50px;
        line-height: 24px;
        font-size: 12px;
        margin-top: 25px;
        & .hot-img{
          float: left;
          width: 50px;
          height: 50px;
        }
        & .hot-info{
          margin-left: 62px;
          line-height: 24px;
          & .hot-name{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>

