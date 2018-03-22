<template>
  <div class="comment-main">
    <div class="comment-title">
      <h3>评论</h3>
      <span class="comment-total">共{{commentData.total}}评论</span>
    </div>
    <ul class="comment-list">
      <li v-for="(comment, index) in commentData.comments" :key="index">
        <img class="comment-img" :src="comment.user.avatarUrl" alt="">
        <div class="comment-info">
          <p>
            <span class="comment-name"> {{comment.user.nickname}}:</span>
            {{comment.content}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'comment',
    props: ['commentData']
  }
</script>

<style lang="scss">
  .comment-main{
    margin-top: 25px; 
    margin-bottom: 25px;
    & .comment-title{
      display: flex;
      align-items: center;
    &  .comment-total{
        color: #666;
        margin-left: 20px;
        font-size: 12px;
      }
    }
    & .comment-list{
      margin-top: 10px;
      & li {
        display: flex;
        padding: 15px 0;
        border-top: 1px dotted #ccc;
        & .comment-img{
          width: 50px;
          height: 50px;
        }
        & .comment-info{
          margin-left: 15px;
          font-size: 12px;
          line-height: 20px;
          & .comment-name{
            color: #0c73c2;
            margin-right: 5px;
          }
          & .comment-meta{
            margin-top: 15px;
            color: #999;
          }
        }
      }
    }
  }
</style>

