<template>
  <div class="m-playlist">
    <sg-row>
      <sg-col :col="18" :offset="3">
        <sg-row :gutter="15">
          <sg-col :col="18" class="playlist-main">
            <div class="playlist-meta">
                <img class="meta-img" :src="playlist.coverImgUrl" alt="">
                <div class="playlist-info">
                  <h1>{{playlist.name}}</h1>
                  <span class="btn-1"><img :src="creator.avatarUrl" alt=""></span>
                  <span class="btn-1">{{creator.nickname}}</span>
                  <span class="btn-1">{{playlist.createTime}} 创建</span>
                  <div class="info-meta">
                    <span class="btn-2"><i class="far fa-play-circle"></i>播放</span>
                    <span class="btn-2"><i class="far fa-folder"></i>0</span>
                    <span class="btn-2"><i class="fas fa-download">0</i></span>
                    <span class="btn-2"><i class="far fa-comment-alt"></i>0</span>
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
          </sg-col>
          <sg-col :col="6">123</sg-col>
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
        creator: {}
      }
    },
    methods: {
      async getMusicDetail(id){
        const { data: { playlist } } = await api.getPlaylistDetail$id(id)
        playlist.createTime = this.formatDate(playlist.createTime);
        this.playlist = playlist;
        this.creator = playlist.creator;
      },
      formatDate(now){
        const date = new Date(now);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    },
    created(){
      const { query: { id }} = this.$route;
      this.getMusicDetail(id);
    }
  }  
</script>

<style lang="scss">
  .m-playlist{
    & .playlist-main{
      padding: 47px 30px 40px 39px;
      & .playlist-meta{
        display: flex;
        & .playlist-info{
          margin-left: 20px;
          & h1{
            line-height: 24px;
            font-size: 20px;
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
              border: 1px solid red;
              text-align: center;
              padding: 0 10px;
              Letter-spacing: 5px;
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
            margin-top: 4px;
            line-height: 18px;
            font-size: 12px;
            color: #666;
          }
        }
        & .meta-img{
          width: 200px;
          height: 200px;
          border: 4px solid #fff;
          outline: 1px solid #d5d5d5;
        }
      }
    }
  }
</style>

