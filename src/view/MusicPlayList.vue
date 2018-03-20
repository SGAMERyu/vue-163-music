<template>
  <div>
    <sg-row>
      <sg-col :col="18" :offset="3">
        <sg-row>
          <sg-col :col="18">
            <div class="m-playDetail">
              <detail-head :detailData="playlist" v-on:setTracks="handlePlay"></detail-head>
              <detail-song :songData="playlist.tracks"></detail-song>
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
import detailHead from '../components/DetailHead.vue';
import detailSong from '../components/DetailSong.vue';

export default {
    name: 'playlist',
    data(){
      return {
        playlist: {},
        toplist: [],
      }
    },
    components: {
      'detail-head': detailHead,
      'detail-song': detailSong
    },
    methods: {
      async getMusicDetail(id){
        const { data: { playlist } } = await api.getPlaylistDetail$id(id)
        playlist.createTime = this.formatDate(playlist.createTime);
        this.playlist = playlist;
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
        this.$store.commit('getTracks', this.playlist.tracks);
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
    padding: 47px 30px 40px 39px;
    background: #fff;
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
    .playDetail-aside{
      padding: 47px 30px 40px 39px;
      background: #fff;
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
</style>

