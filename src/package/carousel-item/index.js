import CarouselItem from './src/carousel-item.vue';

CarouselItem.install = function(vue){
  vue.component(CarouselItem.name, CarouselItem);
}

export default CarouselItem;