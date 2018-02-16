<template>
  <div class="sg-slider">
    <div class="sg-slider-runway" :style="runwayStyle" ref="runway" @click="onSliderClick">
      <div class="sg-slider-fill" :style="fillSize"></div>
      <div class="sg-slider-thumb" :style="[thumbOffset, thumbStyle]"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SgSlider',
    data(){
      return {
        runwaySize: 0,
        runwayTop: 0,
        runwayLeft: 0
      }
    },
    props: {
      value: {
        type: Number,
        default: 0,
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100,
      },
      step: {
        type: Number,
        default: 1,
      },
      width: {
        type: Number,
        default: 9,
      },
      height: {
        type: Number,
        default: 9
      },
      thumbSize: {
        type: Number,
        default: 16, 
      },
      gutter: {
        type: Number,
        default: 22,
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(val){
        this.setValues(val);
      }
    },
    computed: {
      runwayStyle(){
        return this.vertical ? {
          width: `${this.height}px`,
          marginLeft: `${this.gutter}px`,
          marginRight: `${this.gutter}px`
       } : {
          height: `${this.height}px`,
          marginTop: `${this.gutter}px`,
          marginBottom: `${this.gutter}px`,
       }
      },
      fillSize(){
        return this.vertical ? {
          width: `${this.width}px`,
          height: `${100 * (this.value - this.min) / (this.max - this.min)}%`
        } : {
          width: `${100 * (this.value - this.min) / (this.max - this.min)}%`,
          height: `${this.height}px`,
        }
      },
      thumbStyle(){
        return this.vertical ? {
          width: `${this.thumbSize}px`,
          height: `${this.thumbSize}px`,
          left: `${this.runwayLeft * 0.5 - this.thumbSize / 2}px`,
        } : {
          width: `${this.thumbSize}px`,
          height: `${this.thumbSize}px`,
          top: `${this.runwayTop * 0.5 - this.thumbSize / 2}px`,
        }
      },
      thumbOffset(){
        return this.vertical ? {
          bottom: `${100 * (this.value - this.min) / (this.max - this.min)}%`
        } : {
          left: `${100 * (this.value - this.min) / (this.max - this.min)}%`
        }
      }
    },
    methods: {
      setValues(val){
        this.$emit('input', val)
      },
      resetSize(){
        this.runwaySize = this.vertical ? this.$refs['runway'].clientHeight : this.$refs['runway'].clientWidth;
        this.runwayTop = this.$refs['runway'].clientHeight;
        this.runwayLeft = this.$refs['runway'].clientWidth;
      },
      onSliderClick(e){
        if(this.vertical){
          const offsetTop = this.$refs['runway'].getBoundingClientRect().top;
          this.setPosition(((e.clientY - offsetTop) / this.runwaySize));
        }else{
          const offsetLeft = this.$refs['runway'].getBoundingClientRect().left
          this.setPosition(((e.clientX - offsetLeft) / this.runwaySize * 100));
        }
      },
      setPosition(precent){
        const lengthStep = 100 / ((this.max - this.min) / this.step);
        const steps = Math.round(precent / lengthStep);
        let value = steps * lengthStep * (this.max - this.min) * 0.01 + this.min
        value = parseFloat(value);
        this.$emit('input', value);
      }
    },
    mounted(){
      this.resetSize();
    }
  }
</script>

<style lang="scss">
  .sg-slider{
    width: 493px;
    height: 53px;
    margin: 100px auto;
    &-runway{
      width: 100%;
      background: #131313;
      border-radius: 5px;
      cursor: pointer;
      position: relative;
    }
    &-thumb{
      position: absolute;
      border-radius: 50%;
      background: #b8180d;
      box-shadow: inset 0 0 0 4px #ffffff;
      z-index: 99;
    }
    &-fill{
      width: 0%;
      left: 0%;
      background: #b8180d;
      border-radius: 5px;
    }
  }
</style>

