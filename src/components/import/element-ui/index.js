import Vue from 'vue'
import {
  Message,
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
  Loading,
  Skeleton,
  SkeletonItem,
  Image,
  Empty,
} from 'element-ui';

const ComponentList = [
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
  Loading,
  Skeleton,
  SkeletonItem,
  Image,
  Empty,
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}

//全局使用message
Vue.prototype.$message = Message
