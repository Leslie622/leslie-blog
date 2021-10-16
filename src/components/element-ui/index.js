import Vue from 'vue'
import {
  Button,
  Select,
  Option,
  Popover,
  Timeline,
  TimelineItem,
  Loading,
  Skeleton,
  SkeletonItem,
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
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
