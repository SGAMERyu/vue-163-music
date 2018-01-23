import NavItem from './src/nav-item.vue';

NavItem.install = function(Vue){
  Vue.component(NavItem.name, NavItem);
}

export default NavItem;
