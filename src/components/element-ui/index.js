import Vue from 'vue'
import {
  Button,
  Select,
  Option,
} from 'element-ui';

const ComponentList = [
  Button,
  Select,
  Option,
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
