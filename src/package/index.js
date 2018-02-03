import Row from './row/index';
import Col from './col/index';
import Nav from './nav/index';
import NavItem from './nav-item/index';
import Carousel from './carousel/index';
import CarouselItem from './carousel-item/index';
import Breadcrumb from './breadcrumb/index';
import BreadcrumbItem from './breadcrumb-item/index';

const components = [
  Row,
  Col,
  Nav,
  NavItem,
  Carousel,
  CarouselItem,
  Breadcrumb,
  BreadcrumbItem
]

const install = function(Vue, opts = {}){
  components.map(component => {
    Vue.component(component.name, component);
  })
}

export default {
  install,
}