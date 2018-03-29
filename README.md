#### 熟练VUEJS--仿造pc网易云音乐
在学习完vueJS,一直想做个项目来锻炼一下,选来选去，还是做个网易云音乐，其间遇到了很多坑,也逐渐接受了vue这种组件化的思想以及从Dom操作转换为用数据去驱动视图。并且在某部分基础组件上借鉴(搬运)了elementUI的源码(不过elementUI写的是真好)
#### 技术栈
+ Vue.js
+ Vuex
+ Vue-router
+ axios
+ [Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的API
在其中也知道了组件之间在不同场景之间的数据传输方式(父子prop, 兄弟EventBus,多个组件共享vuex)
#### 已完成功能
+ 首页
+ 播放器功能 -- 上一曲, 下一曲, 暂停等功能
+ 歌单展示/详情页
+ 专辑展示/详情页
+ 歌手展示/详情页
+ 歌词列表
+ 单曲详情页
+ 评论
#### 项目运行

```
npm install 

npm run dev

// 在163Api文件路径下启动
npm install

node app.js
```

#### 遇到的问题
1. 繁琐的API的调用,由于使用的Api的接口很多,如果要一个一个写的话,太冗余,在看了掘金上一边[文章](https://juejin.im/post/5a6fd23ff265da3e4a6fc189)之后,果断的用了Proxy代理方式

```
import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3000`

export const api = new Proxy({}, {
  get(target, prop){
    let method = /^[a-z]+/g.exec(prop)[0];
    let path = prop
              .substring(method.length)
              .replace(/([A-Z])/g, '/$1')
              .replace(/(\$)([a-z]+)/g, '?$2=')
              .toLowerCase();
    return function(data = "", options = {}, and=false){
      let url = `${path}${data}`;
      if(and){
        for(let [key, value] of Object.entries(options)){
          url += `&${key}=${value}`;        
        }
      } 
      return axios({ method, url })
    }
  } 
})

```

2. 整体项目的设计,奉劝大家一句,在项目的构建中,最好提前提前规划好数据的流通以及各个组件的交互,否则会出现大量冗余的代码，后面修改的话会很麻烦
3. 组件共享状态,在vue中目前常用的数据传递方式有props,EventBus,vuex根据应用场景的不同来使用它们
4. 性能问题，再用chrome的lighthouse测试下才37的评分,无疑是不合格的,后续会学习性能优化的相关知识，在以后更新会考虑到性能问题

![](https://github.com/SGAMERyu/vue-163-music/blob/master/images/1.png)

#### 项目地址

[源代码](https://github.com/SGAMERyu/vue-163-music),希望大家指出我代码的不足之处，多交流,也欢迎大家来follow和star
#### 预览图

![](https://github.com/SGAMERyu/vue-163-music/blob/master/images/2.png)

![](https://github.com/SGAMERyu/vue-163-music/blob/master/images/3.png)

![](https://github.com/SGAMERyu/vue-163-music/blob/master/images/4.png)

![](https://github.com/SGAMERyu/vue-163-music/blob/master/images/5.png)

![](https://github.com/SGAMERyu/vue-163-music/blob/master/images/6.png)


