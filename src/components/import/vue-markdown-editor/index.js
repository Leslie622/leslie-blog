import Vue from 'vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

//主题or代码高亮
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, { Hljs: hljs, });

// 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
VMdPreview.use(createLineNumbertPlugin());

//内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
VMdPreview.use(createAlignPlugin());

Vue.use(VMdPreview);