import BreadcrumbItem from './src/breadcrumb-item.vue';

BreadcrumbItem.install = function(vue){
  vue.component(BreadcrumbItem.name, BreadcrumbItem);
}

export default BreadcrumbItem;