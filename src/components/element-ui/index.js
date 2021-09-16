import Vue from 'vue'
import {
  Button
} from 'element-ui';

const ComponentList = [
  Button,
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
