import Slider from './src/slider.vue';

Slider.install = function(vue){
  vue.component(slider.name, slider);
}

export default Slider;