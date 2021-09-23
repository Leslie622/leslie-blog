import Vue from 'vue'
import {
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
} from 'element-ui';

const ComponentList = [
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
