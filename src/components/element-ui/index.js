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
  Image,
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
]

if (ComponentList.length) {
  ComponentList.forEach(Component => Vue.use(Component))
}
