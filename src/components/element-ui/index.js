import Vue from 'vue'
import {
  Button,
  Select,
  Option,
  Popover,
} from 'element-ui';

const ComponentList = [
  Button,
  Select,
  Option,
  Popover,
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
