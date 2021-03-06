import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      meta: {
        forAuth: true
      },
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        {
          path: '/basetable',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve)
        },
        {
          path: '/articles',
          component: resolve => require(['../components/page/Articles.vue'], resolve)     // 文章列表
        },
        {
          name:'article',
          path: '/article/:id',
          component: resolve => require(['../components/page/Article.vue'], resolve)     // 文章编辑
        },
        {
          path: '/vuetable',
          component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
        },
        {
          path: '/baseform',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        },
        {
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
        },
        {
          path: '/basecharts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
        },
        {
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
        }
      ]
    },
    {
      path: '/login',
      meta: {
        forVisitors: true
      },
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
})
