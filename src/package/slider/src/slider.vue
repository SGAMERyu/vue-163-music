<template>
  <div class="sg-slider">
    <div class="sg-slider-runway" :style="runwayStyle" ref="runway" @click="onSliderClick">
      <div class="sg-slider-fill" :style="fillSize"></div>
      <div class="sg-slider-thumb" :style="[thumbOffset, thumbStyle]" @mousedown="onDragStart"></div>
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
        runwayLeft: 0,
        startX: 0,
        startY: 0,
        drag: false,
        newOffset: 0,
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
          width: `${this.width}px`,
          height: `${this.height}px`,
          marginLeft: `${this.gutter}px`,
          marginRight: `${this.gutter}px`
       } : {
          width: `${this.width}px`,
          height: `${this.height}px`,
          marginTop: `${this.gutter}px`,
          marginBottom: `${this.gutter}px`,
       }
      },
      fillSize(){
        return this.vertical ? {
          width: `${this.width}px`,
          height: this.sliderOffset,
          bottom: `0%`
        } : {
          width: this.sliderOffset,
          height: `${this.height}px`,
          left: `0%`
        }
      },
      thumbStyle(){
        return this.vertical ? {
          width: `${this.thumbSize}px`,
          height: `${this.thumbSize}px`,
          left: `50%`,
          transform: `translateX(-50%)`
        } : {
          width: `${this.thumbSize}px`,
          height: `${this.thumbSize}px`,
          top: `50%`,
          transform: `translateY(-50%)`
        }
      },
      thumbOffset(){
        return this.vertical ? {
          bottom: this.sliderOffset
        } : {
          left: this.sliderOffset
        }
      },
      sliderOffset(){
        return `${100 * (this.value - this.min) / (this.max - this.min)}%`;
      }
    },
    methods: {
      setValues(val){
        if(val < this.min){
          this.$emit('input', this.min);
        } else if(val > this.max){
          this.$emit('input', this.max);
        } else {
          this.$emit('input', val)
        }
      },
      resetSize(){
        this.runwaySize = this.vertical ? this.$refs['runway'].clientHeight : this.$refs['runway'].clientWidth;
        this.runwayTop = this.$refs['runway'].clientHeight;
        this.runwayLeft = this.$refs['runway'].clientWidth;
      },
      onSliderClick(e){
        this.resetSize();
        if(this.drag) return;
        if(this.vertical){
          const offsetBottom = this.$refs['runway'].getBoundingClientRect().bottom;
          this.setPosition(((offsetBottom - e.clientY) / this.runwaySize * 100));
        }else{
          const offsetLeft = this.$refs['runway'].getBoundingClientRect().left
          this.setPosition(((e.clientX - offsetLeft) / this.runwaySize * 100));
        }
        this.emitChange();
      },
      setPosition(precent){
        const lengthStep = 100 / ((this.max - this.min) / this.step);
        const steps = Math.round(precent / lengthStep);
        let value = steps * lengthStep * (this.max - this.min) * 0.01 + this.min
        value = parseFloat(value);
        this.$emit('input', value);
      },
      onDragStart(event){
        this.resetSize();
        this.drag = true;
        if(this.vertical){
          this.startY = event.clientY; 
        } else {
          this.startX = event.clientX;
        }
        this.newOffset = parseFloat(this.sliderOffset); 
        window.addEventListener('mousemove', this.onDraging);
        window.addEventListener('mouseup', this.onDragEnd)
      },
      onDraging(event){
        let diff = 0;
        if(this.vertical){
          let currentY = event.clientY;
          diff = (this.startY - currentY) / this.runwaySize * 100; 
        } else {
          let currentX = event.clientX;
          diff = (currentX - this.startX) / this.runwaySize * 100;
        }
        let newOffset = this.newOffset + diff;
        this.setPosition(newOffset);
      },
      onDragEnd(event){
        this.drag = false;
        this.emitChange();
        window.removeEventListener('mousemove', this.onDraging);
        window.removeEventListener('mouseup', this.onDragEnd);
      },
      emitChange(){
        this.$nextTick(() => {
          this.$emit('change', this.value);
        })
      }
    },
    mounted(){
      this.resetSize();
    }
  }
</script>

<style lang="scss">
  .sg-slider{
    height: 100%;
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
      box-shadow: inset 0 0 0 5px #ffffff;
      z-index: 99;
    }
    &-fill{
      position: absolute;
      background: #b8180d;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
</style>

