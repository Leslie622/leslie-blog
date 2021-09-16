import Vue from 'vue'
import {

} from 'element-ui';

const ComponentList = [

]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
