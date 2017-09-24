import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import auth from './packages/auth/auth';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.use(auth);

router.beforeEach(
  (to, form, next) => {
    if (!localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      const data = {
        refresh_token: localStorage.getItem('refresh_token'),
        scope: '*'
      };
      axios.post('http://localhost/blog/public/api/oauth/refresh-token', data)
        .then(response => {
          // 刚开始踩坑了，js的时间戳微妙为单位，而且木有时区，和PHP不一样
          let js_time = Math.round(new Date().getTime() / 1000 - 28800)
          Vue.auth.setToken(response.data.access_token, response.data.refresh_token, response.data.expires_in + js_time);
          next({path: '/readme'})
        })
        .catch(response => {
          next({path: '/login'})
        });
    }
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuthenticated()) {
        next({path: '/readme'})
      }else {
        next()
      }
    } else if (to.matched.some(record => record.meta.forAuth)) {
      if (!Vue.auth.isAuthenticated()) {
        next({path: '/'})
      }else {
        next()
      }
    } else {
      next()
    }
  }
)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');