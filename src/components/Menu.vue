<template>
  <div class="m-menu">
    <div class="menu-top">
      <div class="menu-wrap">
        <h1 class="menu-logo">
          <router-link to="/"></router-link>
        </h1>
        <sg-nav bg="#242424" textColor="#ccc" gutter="19px" activeTextColor="#fff" hoverBg="#000" height="70px" defaultActive="/">
          <sg-nav-item index="home">发现音乐</sg-nav-item>
          <sg-nav-item index="my">我的音乐</sg-nav-item>
          <sg-nav-item index="friend">朋友</sg-nav-item>
          <sg-nav-item index="store">商城</sg-nav-item>
          <sg-nav-item index="nmusician">音乐人</sg-nav-item>
          <sg-nav-item index="download">下载客户端</sg-nav-item>
        </sg-nav>
        <div class="menu-util">
          <input type="text" class="menu-srh" placeholder="音乐/视频/电台/用户">
          <div class="menu-login">登录</div>
          <div class="menu-video">视频投稿</div>
        </div>
      </div>
    </div>
    <div class="menu-flag">
      <div class="menu-warp-f">
       <sg-nav bg="#C20C0C" textColor="#fff" gutter="20px" activeTextColor="#fff" hoverBg="#9B0909" height="70px" defaultActive="home">
        <sg-nav-item index="home">推荐</sg-nav-item>
        <sg-nav-item index="toplist">排行榜</sg-nav-item>
        <sg-nav-item index="playlists">歌单</sg-nav-item>
        <sg-nav-item index="djradio">主播电台</sg-nav-item>
        <sg-nav-item index="artistlists">歌手</sg-nav-item>
        <sg-nav-item index="albumlists">新碟上架</sg-nav-item>
      </sg-nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'm-menu',
  }  
</script>

<style lang="scss">
  .m-menu{
    position: relative;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #000;
    & .menu-top{
      flex: 100%;
      height: 70px;
      line-height: 70px;
      background: #242424;
      & .menu-wrap{
        display: flex;
        width: 1100px;
        margin: 0 auto;  
      }
      & .menu-logo{
        flex: 0 0 176px;
        width: 176px;
        height: 69px;
        background-position: 0 0;
        background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?6924b0efc640d45c9cdb80ce5da2cb23);
      }
      & .menu-logo a{
        width: 157px;
        height: 100%;
        padding-right: 20px;
        text-indent: -9999px;
        box-sizing: content-box;
      }
      & .menu-util{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        & .menu-srh{
          width: 158px;
          height: 32px;
          border-radius: 15px;
          color: #9b9b9b;
          border: none;
          outline: none;
          font-size: 12px;
          padding: 8px 12px;
        }
        & .menu-video{
          width: 90px;
          height: 32px;
          line-height: 32px;
          color: #CCC;
          border-radius: 32px;
          margin-left: 12px;
        }
        & .menu-login{
          color: #787878;
          width: 28px;
          margin-left: 15px;
        }
      }
    }
    & .menu-flag{
      flex: 100%;
      height: 35px;
      line-height: 35px;
      background-color: #C20C0C;
      border-bottom: 1px solid #a40011;
      & .menu-warp-f{
        width: 1100px;
        margin: 0 auto;
        padding-left: 180px; 
      }
    }
  }
</style>

