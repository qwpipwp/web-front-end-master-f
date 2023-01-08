import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/createStore'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import "@/styles/index.scss";
//markdown编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
//markdown主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
//markdown 预览
import '@kangc/v-md-editor/lib/style/preview.css';
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

import Prism from 'prismjs';
VueMarkdownEditor.use(githubTheme, {
  Prism,
}, createAlignPlugin());

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
  
//   const publicPages = ['/login','/SignUp','/Findback','/editor','/Homepage','/Homepage/Information','/Homepage/Blogview'];
//   const authRequired = !publicPages.includes(to.path);

//   var loggedIn = store.state.loggedIn

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }
//   next();
// })

createApp(App)
  .use(ElementPlus)
  .use(store).use(router)
  .use(VueMarkdownEditor)
  .mount('#app')