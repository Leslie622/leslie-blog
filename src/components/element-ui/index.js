import Vue from 'vue'
import {
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
  Loading,
} from 'element-ui';

const ComponentList = [
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
  Loading,
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
