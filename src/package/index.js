import Row from './row/index';
import Col from './col/index';
import Nav from './nav/index';
import NavItem from './nav-item/index';

const components = [
  Row,
  Col,
  Nav,
  NavItem
]

const install = function(Vue, opts = {}){
  components.map(component => {
    Vue.component(component.name, component);
  })
}

export default {
  install,
}