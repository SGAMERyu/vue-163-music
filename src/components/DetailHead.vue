<template>
  <div class="detail-main">
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailHead',
    props: ['detailData']
  }  
</script>

<style lang="scss">
  .detail-main{
    padding: 47px 30px 40px 39px;
    background: #ffffff;
    display: flex;
    & .detail-img{
      max-width: 200px;
      max-height: 200px;
      border: 4px solid #fff;
      outline: 1px solid #d5d5d5;
    }
    & .detail-info{
      font-size: 12px;
      margin-left: 40px;
      & h2{
        font-size: 20px;
        line-height: 24px;
        font-weight: normal;
      }
      & p{
        margin-top: 4px;
        line-height: 18px;
        color: #666;
      }
    }
  }
</style>
