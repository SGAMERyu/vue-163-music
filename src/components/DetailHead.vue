<template>
  <div class="detail-main">
    <div class="detail-container" v-if="type === 'album'">
      <img class="detail-img" :src="detailData.picUrl" alt="" srcset="">
      <div class="detail-info">
        <h2>{{detailData.name}}</h2>
        <p>
          <span>歌手: </span>
          <span v-for="(artist, index) in detailData.artists" :key="index">
            <i v-if="index >= 1">,</i> {{artist.name}}
          </span>
          </p>
        <p>
          <span>专辑类型: </span>
          <span>{{detailData.subType}}</span>
        </p>
        <p>
          <span>发行公司: </span>
          <span>{{detailData.company}}</span>
        </p>
        <div class="detail-toolbar">
          <span class="btn" @click="setTracks"><i class="far fa-play-circle"></i>播放</span>
          <span class="btn"><i class="far fa-folder"></i>收藏</span>
          <span class="btn"><i class="fas fa-share-square"></i>{{info.shareCount}}</span>
          <span class="btn"><i class="fas fa-download"></i>下载</span>
          <span class="btn"><i class="far fa-comment-alt"></i>{{info.commentCount}}</span>
        </div>
      </div>
      <div class="detail-desc">
        <h3>专辑介绍: </h3>
        <p>{{detailData.description}}</p>
      </div>
    </div>
    <div class="detail-container" v-else-if="type === 'playlist'">
      <img class="detail-img" :src="detailData.coverImgUrl" alt="" srcset="">
      <div class="detail-info">
        <h2>{{detailData.name}}</h2>
        <span class="detail-meta"><img :src="info.avatarUrl" alt=""></span>
        <span class="detail-meta">{{info.nickname}}</span>
        <span class="detail-meta">{{detailData.createTime}} 创建</span>
        <div class="detail-toolbar">
          <span class="btn" @click="setTracks"><i class="far fa-play-circle"></i>播放</span>
          <span class="btn"><i class="far fa-folder"></i>收藏{{detailData.subscribedCount}}</span>
          <span class="btn"><i class="fas fa-share-square"></i>{{detailData.shareCount}}</span>
          <span class="btn"><i class="fas fa-download"></i>下载</span>
          <span class="btn"><i class="far fa-comment-alt"></i>{{detailData.commentCount}}</span>
        </div>
        <div class="detail-tags">
          <span>标签:</span>
          <span v-for="(tag, index) in detailData.tags" :key="index">{{tag}}</span>
        </div>
      </div>
      <div class="detail-desc">
        <h3>介绍: </h3>
        <p>{{detailData.description}}</p>
      </div>
    </div>
    <div class="detail-container" v-else-if="type === 'artist'">
      <img class="detail-img" :src="detailData.picUrl" alt="">
      <div class="detail-info">
        <h2>{{detailData.name}}</h2>
        <p>
          <span>单曲: </span>
          <span>{{detailData.musicSize}}</span>
        </p>
        <p>
          <span>专辑: </span>
          <span>{{detailData.albumSize}}</span>
        </p>
        <p>
          <span>MV: </span>
          <span>{{detailData.mvSize}}</span>
        </p>
        <div class="detail-toolbar">
          <span class="btn" @click="setTracks"><i class="far fa-play-circle"></i>播放</span>
          <span class="btn"><i class="far fa-folder"></i>收藏</span>
        </div>
      </div>
      <div class="detail-desc">
        <h3>歌手简介</h3>
        <p>{{detailData.briefDesc}}</p>
      </div>
    </div>
    <div class="detail-container" v-else>
      <img class="detail-img" :src="info.picUrl" alt="">
      <div class="detail-info">
        <h2>{{detailData.name}}</h2>
        <p>
          <span>歌手: </span> 
          <span>{{info.author}}</span>
        </p>
        <p>
          <span>专辑: </span>
          <span>{{info.album}}</span>
        </p>
        <div  class="detail-toolbar">
          <span class="btn" @click="setTracks"><i class="far fa-play-circle"></i>播放</span>
          <span class="btn"><i class="far fa-folder"></i>收藏{{detailData.subscribedCount}}</span>
          <span class="btn"><i class="fas fa-share-square"></i>分享</span>
          <span class="btn"><i class="fas fa-download"></i>下载</span>
          <span class="btn"><i class="far fa-comment-alt"></i></span>
        </div>
      </div>
      <div class="detail-desc">
        <h3>歌词: </h3>
        <div class="detail-lyric">
          <p v-for="(lyric, index) in detailData.lyrics" :key="index">{{lyric}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailHead',
    data(){
      return {
        type: 'default',
        info: {},
        clicked: false
      }
    },
    props: ['detailData'],
    watch: {
      detailData(val){
        if(this.type === 'album'){
          this.info = this.detailData.info;
        }else if(this.type === 'playlist'){
          this.info = this.detailData.creator;
        }else if(this.type === 'song'){
          this.info = {
            album: this.detailData.al.name,
            picUrl: this.detailData.al.picUrl,
            author: this.detailData.ar.name
          }
        }
      }
    },
    methods: {
      setTracks(value){
        this.$emit('setTracks', value);
      }
    },
    created(){
      this.type = this.$route.name;
    }
  }  
</script>

<style lang="scss">
  .detail-main{
    & .detail-container{
      display: flex;
      flex-wrap:  wrap;
      margin-bottom: 10px;
    }
    & .detail-img{
      max-width: 200px;
      max-height: 200px;
      border: 4px solid #fff;
      outline: 1px solid #d5d5d5;
    }
    & .detail-info{
      max-width: calc(100% - 215px);
      font-size: 12px;
      margin-left: 15px;
      & h2{
        width: 100%;
        font-size: 20px;
        line-height: 24px;
        font-weight: normal;
        margin-bottom: 12px;
      }
      & p{
        margin-top: 4px;
        line-height: 18px;
        color: #666;
      }
      & .detail-meta{
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        & img{
          width: 35px;
          height: 35px;
        }
      }
      & .detail-tags{
        margin-top: 25px;
        & span:not(:nth-of-type(1)){
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
    }
    & .detail-toolbar{
      margin-top: 25px;
      & .btn{
        display: inline-block;
        padding: 0 5px;
        min-width: 50px;
        height: 30px;
        line-height: 30px;
        color: #333;
        border: 1px solid #c9c9c9;
        margin-right: 5px;
        text-align: center;
        cursor: pointer;
        &:nth-of-type(1){
          background: #ea6f5a;
          border: 1px solid #c20c0c;
          color: #fff;
        }
        & i {
          margin-right: 5px;
        }
      }
    }
    & .detail-desc{
      width: 100%;
      margin-top: 40px;
      font-size: 12px;
      & .detail-lyric{
        columns: 4 100px;
        column-gap: 0;
      }
      & p{
        color: #666;
        line-height: 24px;
      }
    }
  }
</style>
