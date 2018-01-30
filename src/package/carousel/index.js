import Carousel from './src/carousel.vue';

Carousel.install = function(vue){
  vue.component(Carousel.name, Carousel);
}

export default Carousel;