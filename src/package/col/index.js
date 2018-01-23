import Col from './src/col.vue';

Col.install = function(Vue){
  Vue.component(Col.name, Col);
}

export default Col;