// import Vue from 'vue'
// import VueRouter from 'vue-router'

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
      // 404
    {
      path: '*',
      name: 'error',
      component: () => import('../views/Error.vue')
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('../views/Dev.vue')
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('../views/Apps.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Setting.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/app/:app_id',
      name: 'app',
      component: () => import('../views/App.vue')
    },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
