<template>
  <div class="sg-carousel" :style="style">
    <slot></slot>
    <button class="sg-prev" @click.stop="prev">
      <i class="fas fa-chevron-left fa-2x"></i>
    </button>
    <button class="sg-next" @click.stop="next">
      <i class="fas fa-chevron-right fa-2x"></i>
    </button>
    <ul class="sg-dots">
      <li v-for="(dot, index) in items" :key="index" class="sg-dot" :class="{active: index === activeIndex}" @click.stop="handleDotClick(index)"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SgCarousel',
    data(){
      return {
        items: [],
        activeIndex: 0,
        timer: null
      }
    },
    props: {
      height: String,
      interval: {
        type: Number,
        default: 3000
      },
      initIndex: {
        type: Number,
        default: 0,
      }
    },
    computed:{
      style(){
        let ret = {};
        if(this.height){
          ret.height = `${this.height}px`;
        }
        return ret;
      },
    },
    watch: {
      items(val){
        if(val.length > 0) this.items[this.initIndex].$el.style.display = 'block';
      },
      activeIndex(index){
        this.restItem(index)
      }
    },
    methods: {
      addItem(item){
        this.items.push(item);
      },
      setActiveItems(index){
        if(index > this.items.length - 1){
          this.activeIndex = 0;
        }else if(index < 0){
          this.activeIndex = this.items.length - 1;
        }else{
          this.activeIndex = index;
        }
      },
      startTimer(){
        if(this.interval < 0) return;
        this.timer = setInterval(this.playSlides, this.interval);
      },
      observeTimer(){
        let observe = new IntersectionObserver((entry)=>{
          entry.forEach(entries => {
            if(entries.isIntersecting){
              this.startTimer();
            }else{
              clearInterval(this.timer);
            }
          })
        })
        observe.observe(this.$el);
      },
      playSlides(){
        if(this.activeIndex < this.items.length - 1){
          this.activeIndex++;
        }else{
          this.activeIndex = 0;
        }
      },
      restItem(val){
        this.items.forEach((item, index) => {
          if(val === index){
            item.$el.style.display = 'block';
          }else{
            item.$el.style.display = 'none';
          }
        })
      },
      handleDotClick(index){
        clearInterval(this.timer);
        this.activeIndex = index;
        this.startTimer();
      },
      prev(){
        this.setActiveItems(this.activeIndex - 1);
      },
      next(){
        this.setActiveItems(this.activeIndex + 1);
      }
    },
    mounted(){
      this.$nextTick( () => {
        this.observeTimer();
      })
    }
  }  
</script>

<style lang="scss">
  .sg-carousel{
    position: relative;
    width: 100%;
  }
  .sg-dots{
    position: absolute;
    width: 730px;
    height: 20px;
    top: 310px;
    left: calc(50% - 365px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sg-dot{
    width: 8px;
    height: 8px;
    margin-left: 12px;
    border-radius: 50%;
    background: #a6a7ac;
    &.active{
      background: #bc0b0b;
    }
  }
  .sg-prev{
    display: block;
    width: 36px;
    height: 63px;
    position: absolute;
    cursor: pointer;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    outline: none;
    border: none;
    top: 50%;
    left: 70px;
    color: #ffffff;
  }
  .sg-next{
    display: block;
    width: 36px;
    height: 63px;
    position: absolute;
    cursor: pointer;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    outline: none;
    border: none;
    top: 50%;
    right: 70px;
    color: #ffffff;
  }
</style>
