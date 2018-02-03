import Breadcrumb from './src/Breadcrumb.vue';

Breadcrumb.install = function(vue){
  vue.component(Breadcrumb.name, Breadcrumb);
}

export default Breadcrumb;